<template>
<div>
    <button style="position: fixed; z-index: 1;" @click="recalculateStickyScroll">RECALC</button>
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        // relative container of all blocks
        sWrapper: {
            type: String,
            required: true,
        },
        // scroll itself
        sScroll: {
            type: String,
            required: true,
        },
        // offset margin between the top/bottom of the window
        offset: {
            type: Object,
            default() {
                return {
                    top: 0,
                    bottom: 30,
                };
            },
        },
    },
    data() {
        return {
            frameId: null,
            affixHeight: null,
            affixRect: null,
            affixInitialTop: null,
            relativeElmOffsetTop: null,
            topPadding: null,
            lastState: null,
            currentState: null,
            currentScrollAffix: null,
            topOfScreen: null,
            lastDistanceFromTop: null,
            scrollingUp: null,
            scrollingDown: null,
            enabled: true,
            scrollAffix: true,
            scrollElem: null,
        };
    },
    mounted() {
        this.scrollElem = document.querySelector(this.sScroll);
        this.scrollElem.classList.add('vue-affix');
        this.affixInitialTop = this.getOffsetTop(this.scrollElem);
        // this.topPadding = this.affixInitialTop - this.getOffsetTop(this.relativeElement);
        this.topPadding = 0;
        this.updateData();
        if (this.scrollAffix) {
            const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
            const shouldUseScrollAffix = this.scrollAffix
                && affixTotalHeight > this.scrollContainer.innerHeight;
            if (shouldUseScrollAffix) this.initScrollAffix();
        }
        this.onScroll();
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        offset(val, oldVal) {
            if (val.top !== oldVal.top || val.bottom !== oldVal.bottom) {
                this.onScroll();
            }
        },
    },
    computed: {
        /**
         * Computes the relative element selector to an element.
         *
         * @return {Element} document.querySelector(this.relativeElementSelector)
         */
        relativeElement() {
            // return document.querySelector(this.relativeElementSelector);
            return document.querySelector(this.sWrapper);
        },
        /**
         * Computes the scroll container selector to an element.
         * Defaults to the window object.
         *
         * @return {Element}
         */
        scrollContainer() {
        if (this.scrollContainerSelector) {
            return document.querySelector(this.scrollContainerSelector);
        }
            return window;
        },
        affixTopPos() {
            return this.affixRect.top + this.topOfScreen - this.offset.top - this.topPadding;
        },
        affixBottomPos() {
            return this.affixRect.bottom + this.topOfScreen + this.offset.bottom;
        },
        bottomOfScreen() {
            return this.topOfScreen + this.scrollContainer.innerHeight;
        },
        relativeElmTopPos() {
            return this.topOfScreen + this.relativeElement.getBoundingClientRect().top;
        },
        relativeElmBottomPos() {
            return this.topOfScreen + this.relativeElement.getBoundingClientRect().bottom;
        },
        screenIsPastAffix() {
            return this.bottomOfScreen >= this.affixBottomPos;
        },
        screenIsBeforeAffix() {
            return this.topOfScreen <= this.affixTopPos;
        },
        screenIsBeforeRelativeElm() {
            return this.topOfScreen <= this.relativeElmTopPos - this.offset.top;
        },
        screenIsPastRelativeElm() {
            return this.bottomOfScreen >= this.relativeElmBottomPos + this.offset.bottom;
        },
        screenIsInsideRelativeElm() {
            return !this.screenIsBeforeRelativeElm && !this.screenIsPastRelativeElm;
        },
    },
    methods: {
        recalculateStickyScroll() {
            this.scrollElem = document.querySelector(this.sScroll); //questionable
            this.scrollElem.classList.add('vue-affix');

            this.affixInitialTop = this.getOffsetTop(this.relativeElement);
            this.topPadding = 0;
            this.updateData();
            if (this.scrollAffix) {
                const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
                const shouldUseScrollAffix = this.scrollAffix
                    && affixTotalHeight > this.scrollContainer.innerHeight;
                if (shouldUseScrollAffix) this.initScrollAffix();
            }
        },
        updateData() {
            this.topOfScreen = this.scrollContainer.scrollTop || window.pageYOffset;
            this.affixRect = this.scrollElem.getBoundingClientRect();
            this.affixHeight = this.scrollElem.offsetHeight;
            this.relativeElmOffsetTop = this.getOffsetTop(this.relativeElement);
        },
        handleScroll() {
            if (this.frameId) {
                return;
            }
            this.frameId = window.requestAnimationFrame(() => {
                this.onScroll();
                this.frameId = null;
            });
        },
        onScroll() {
            if (!this.enabled) {
                this.removeClasses();
                return;
            }
            this.updateData();
            const affixIsBiggerThanRelativeElement = this.affixHeight + this.offset.top
                >= this.relativeElement.offsetHeight;
            if (affixIsBiggerThanRelativeElement) {
                if (this.scrollAffix && this.currentScrollAffix !== 'scrollaffix-top') {
                    this.setScrollAffixTop();
                } else if (this.currentState !== 'affix-top') {
                    this.setAffixTop();
                }
                return;
            }
            const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
            const shouldUseScrollAffix = this.scrollAffix
                && affixTotalHeight > this.scrollContainer.innerHeight;
            if (shouldUseScrollAffix) {
                this.handleScrollAffix();
                return;
            }
            this.handleAffix();
        },
        handleAffix() {
            if (this.topOfScreen < this.relativeElmOffsetTop - this.offset.top) {
                this.setAffixTop();
            }
            if (this.topOfScreen >= this.relativeElmOffsetTop - this.offset.top
                && this.relativeElmBottomPos - this.offset.bottom
                >= this.topOfScreen + this.topPadding + this.affixHeight + this.offset.top) {
                this.setAffix();
            }
            if (this.relativeElmBottomPos - this.offset.bottom < this.topOfScreen
                + this.topPadding + this.affixHeight + this.offset.top) {
                this.setAffixBottom();
            }
            this.lastState = this.currentState;
        },
        handleScrollAffix() {
            this.setScrollingDirection();
            if (this.screenIsBeforeRelativeElm) {
                this.setScrollAffixTop();
            } else if (this.screenIsPastRelativeElm) {
                this.setScrollAffixBottom();
            } else if (this.screenIsInsideRelativeElm) {
                const shouldSetAffixScrolling = (this.currentScrollAffix === 'scrollaffix-top')
                    || (this.currentScrollAffix === 'scrollaffix-bottom')
                    || (this.currentScrollAffix === 'scrollaffix-up' && this.scrollingDown)
                    || (this.currentScrollAffix === 'scrollaffix-down' && this.scrollingUp);
                if (this.screenIsBeforeAffix && this.scrollingUp) {
                    this.setScrollAffixUp();
                } else if (this.screenIsPastAffix && this.scrollingDown) {
                    this.setScrollAffixDown();
                } else if (shouldSetAffixScrolling) {
                    this.setScrollAffixScrolling();
                }
            }
            this.lastScrollAffixState = this.currentScrollAffix;
            this.lastDistanceFromTop = this.topOfScreen;
        },
        /**
         * Sets the initial position of the affixed element
         * when scrollAffix is set to true.
         */
        initScrollAffix() {
            if (this.bottomOfScreen < this.affixBottomPos) {
                this.setScrollAffixTop();
            } else if (this.screenIsInsideRelativeElm) {
                this.setScrollAffixDown();
            } else if (this.screenIsPastRelativeElm) {
                this.setScrollAffixBottom();
            } else {
                this.setScrollAffixScrolling();
            }
        },
        /**
         * Sets te currentScrollAffix to 'scrolling' to indicate that
         * the window is scrolling inside the affixed element.
         */
        setScrollAffixScrolling() {
            this.currentScrollAffix = 'scrollaffix-scrolling';
            this.scrollElem.style.top = `${(Math.floor(this.affixRect.top) + this.topOfScreen) - this.affixInitialTop}px`;
            this.scrollElem.style.bottom = 'auto';
            this.removeClasses();
            this.emitEvent();
        },
        /**
         * Sets the position of the affixed element to be fixed
         * at the top of the screen, as you are scrolling UP.
         */
        setScrollAffixUp() {
            this.currentScrollAffix = 'scrollaffix-up';
            if (this.currentScrollAffix !== this.lastScrollAffixState) {
                this.scrollElem.style.top = `${this.topPadding + this.offset.top}px`;
                this.scrollElem.style.bottom = 'auto';
                this.removeClasses();
                this.emitEvent();
                this.scrollElem.classList.add('affix');
            }
        },
        /**
         * Sets the position of the affixed element to be fixed
         * at the bottom of the screen, as you are scrolling DOWN.
         */
        setScrollAffixDown() {
            this.currentScrollAffix = 'scrollaffix-down';
            if (this.currentScrollAffix !== this.lastScrollAffixState) {
                this.scrollElem.style.bottom = `${this.offset.bottom}px`;
                this.scrollElem.style.top = 'auto';
                this.removeClasses();
                this.emitEvent();
                this.scrollElem.classList.add('affix');
            }
        },
        /**
         * Sets the position of the affixed element to be at the
         * most top.
         */
        setScrollAffixTop() {
            this.currentScrollAffix = 'scrollaffix-top';
            this.scrollElem.style.top = 0;
            this.scrollElem.style.bottom = 'auto';
            this.removeClasses();
            this.emitEvent();
        },
        /**
         * Sets the position of the affixed element to be at the
         * most bottom.
         */
        setScrollAffixBottom() {
            this.currentScrollAffix = 'scrollaffix-bottom';
            this.scrollElem.style.top = `${this.relativeElmBottomPos - this.affixInitialTop - this.affixHeight}px`;
            this.scrollElem.style.bottom = 'auto';
            this.removeClasses();
            this.emitEvent();
        },
        /**
         * Sets the direction the window is being scrolled.
         */
        setScrollingDirection() {
            if (this.topOfScreen > this.lastDistanceFromTop) {
                this.scrollingDown = true;
                this.scrollingUp = false;
            } else {
                this.scrollingUp = true;
                this.scrollingDown = false;
            }
        },
        /**
         * Sets the affix-top class to indicate that the element is
         * above the relative element.
         */
        setAffixTop() {
            this.currentState = 'affix-top';
            if (this.currentState !== this.lastState) {
                this.emitEvent();
                this.removeClasses();
                this.scrollElem.classList.remove('affix');
                this.scrollElem.classList.add('affix-top');
                this.scrollElem.style.top = null;
            }
        },
        /**
         * Sets the affix class to indicate that the element is
         * fixed to the top of the relative element.
         */
        setAffix() {
            this.currentState = 'affix';
            this.scrollElem.style.top = `${this.topPadding + this.offset.top}px`;
            if (this.currentState !== this.lastState) {
                this.emitEvent();
                this.removeClasses();
                this.scrollElem.classList.add('affix');
            }
        },
        /**
         * Sets the affix-bottom class to indicate that the element is
         * below the relative element.
         */
        setAffixBottom() {
            this.currentState = 'affix-bottom';
            this.scrollElem.style.top = `${this.relativeElement.offsetHeight - this.affixHeight
                - this.offset.bottom - this.topPadding}px`;
            if (this.currentState !== this.lastState) {
                this.emitEvent();
                this.removeClasses();
                this.scrollElem.classList.add('affix-bottom');
            }
        },
        /**
         * Removes all three affix classes.
         */
        removeClasses() {
            this.scrollElem.classList.remove('affix-top');
            this.scrollElem.classList.remove('affix');
            this.scrollElem.classList.remove('affix-bottom');
        },
        /**
         * Emits the events based on the current state of the affix.
         */
        emitEvent() {
            if (this.scrollAffix && this.lastScrollAffixState
                && this.currentScrollAffix !== this.lastScrollAffixState) {
                this.$emit(this.currentScrollAffix.replace('-', ''));
            }
            if (this.lastState) {
                this.$emit(this.currentState.replace('-', ''));
            }
        },
        /**
         * Gets the top offset position of an element in the document.
         *
         * @param  {Element} element
         * @return {Number}
         */
        getOffsetTop(element) {
            let yPosition = 0;
            let nextElement = element;
            while (nextElement) {
                yPosition += (nextElement.offsetTop);
                nextElement = nextElement.offsetParent;
            }
            return yPosition;
        },
    },
}
</script>

<style lang="scss">
.vue-affix {
    position: relative;
}
.affix {
    position: fixed;
}
.affix-bottom {
    position: relative;
}
</style>

