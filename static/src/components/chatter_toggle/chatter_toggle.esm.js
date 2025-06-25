/** @odoo-module **/
/* Copyright 2024 Sajjad
 * License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl). */

import { Chatter } from "@mail/core/web/chatter";
import { patch } from "@web/core/utils/patch";
import { useState, onMounted, onWillUnmount, useRef } from "@odoo/owl";

patch(Chatter.prototype, {
    setup() {
        super.setup();
        // Add toggle state to the chatter component
        this.toggleState = useState({
            isChatterVisible: this._getInitialVisibilityState(),
        });
        
        this.chatterRef = useRef("chatter");
        
        onMounted(() => {
            this._initializeChatterVisibility();
            this._addResizeListener();
        });
        
        onWillUnmount(() => {
            this._removeResizeListener();
            this._cleanupMobileToggle();
        });
    },

    /**
     * Add window resize listener for responsive behavior
     */
    _addResizeListener() {
        this._resizeHandler = () => {
            this._handleMobileToggle();
        };
        window.addEventListener('resize', this._resizeHandler);
    },

    /**
     * Remove window resize listener
     */
    _removeResizeListener() {
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
        }
    },

    /**
     * Clean up mobile toggle button
     */
    _cleanupMobileToggle() {
        const mobileToggle = document.querySelector('.o-mobile-chatter-toggle');
        if (mobileToggle) {
            mobileToggle.remove();
        }
    },

    /**
     * Get initial visibility state from localStorage
     */
    _getInitialVisibilityState() {
        const savedState = localStorage.getItem('chatter_visibility');
        return savedState !== null ? savedState === 'true' : true;
    },

    /**
     * Check if chatter is in sidebar mode (right side)
     */
    _isChatterSidebar() {
        const chatterElement = this.chatterRef.el || document.querySelector('.o-mail-Form-chatter');
        return chatterElement && chatterElement.classList.contains('o-aside');
    },

    /**
     * Toggle the visibility of the chatter section
     */
    toggleChatterVisibility() {
        this.toggleState.isChatterVisible = !this.toggleState.isChatterVisible;
        
        // Save the state to localStorage for persistence
        localStorage.setItem('chatter_visibility', this.toggleState.isChatterVisible.toString());
        
        // Add/remove CSS class to control visibility with animation
        this._updateChatterVisibility();
    },

    /**
     * Check if we're on mobile device
     */
    _isMobileDevice() {
        return window.innerWidth <= 768;
    },

    /**
     * Create or update mobile floating toggle button
     */
    _handleMobileToggle() {
        let mobileToggle = document.querySelector('.o-mobile-chatter-toggle');
        const isMobile = this._isMobileDevice();
        const isSidebar = this._isChatterSidebar();
        
        if (isMobile && isSidebar && !this.toggleState.isChatterVisible) {
            if (!mobileToggle) {
                mobileToggle = document.createElement('button');
                mobileToggle.className = 'btn o-mobile-chatter-toggle';
                mobileToggle.innerHTML = '<i class="fa fa-comments"></i>';
                mobileToggle.title = 'Show Chatter';
                mobileToggle.addEventListener('click', () => this.toggleChatterVisibility());
                document.body.appendChild(mobileToggle);
            }
            mobileToggle.classList.add('show');
        } else if (mobileToggle) {
            mobileToggle.classList.remove('show');
        }
    },

    /**
     * Update chatter visibility in DOM
     */
    _updateChatterVisibility() {
        const chatterElement = this.chatterRef.el || document.querySelector('.o-mail-Form-chatter');
        const formViewContainer = document.querySelector('.o_form_view_container');
        const formSheet = document.querySelector('.o_form_sheet_bg');
        
        if (chatterElement) {
            // Add toggling class for animation
            chatterElement.classList.add('toggling');
            
            setTimeout(() => {
                if (this.toggleState.isChatterVisible) {
                    // Show chatter
                    chatterElement.classList.remove('o-chatter-hidden');
                    if (formViewContainer) {
                        formViewContainer.classList.remove('o-chatter-fullscreen');
                    }
                    if (formSheet) {
                        formSheet.classList.remove('o-chatter-fullscreen');
                    }
                } else {
                    // Hide chatter
                    chatterElement.classList.add('o-chatter-hidden');
                    
                    // If it's a sidebar chatter, expand main content
                    if (this._isChatterSidebar()) {
                        if (formViewContainer) {
                            formViewContainer.classList.add('o-chatter-fullscreen');
                        }
                        if (formSheet) {
                            formSheet.classList.add('o-chatter-fullscreen');
                        }
                    }
                }
                chatterElement.classList.remove('toggling');
                
                // Handle mobile floating button
                this._handleMobileToggle();
            }, 50);
        }
    },

    /**
     * Initialize chatter visibility state from localStorage
     */
    _initializeChatterVisibility() {
        // Apply the saved state to the DOM immediately
        if (!this.toggleState.isChatterVisible) {
            this._updateChatterVisibility();
        }
    },
}); 