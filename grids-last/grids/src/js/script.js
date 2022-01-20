"use strict";

document.addEventListener("DOMContentLoaded", actions);



function actions() {

  // Burger 
	const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const Close = document.getElementById("close");
  const phone = document.getElementById("phone");

  class GraphModal {
    constructor(options) {
      let defaultOptions = {
        isOpen: ()=>{},
        isClose: ()=>{},
      }
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = 300;
      this.animation = 'fade';
      this._reOpen = false;
      this._nextContainer = false;
      this.modalContainer = false;
      this.isOpen = false;
      this.previousActiveElement = false;
      this._focusElements = [
        'a[href]',
        'input',
        'select',
        'textarea',
        'button',
        'iframe',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
      ];
      this._fixBlocks = document.querySelectorAll('.fix-block');
      this.events();
    }

    events() {
      if (this.modal) {
        document.addEventListener('click', function(e) {
          const clickedElement = e.target.closest(`[data-graph-path]`);
          if (clickedElement) {
            let target = clickedElement.dataset.graphPath;
            let animation = clickedElement.dataset.graphAnimation;
            let speed =  clickedElement.dataset.graphSpeed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 300;
            this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`); 
            this.open();
            return;
          }

          if (e.target.closest('.modal__close')) {
            this.close();
            return;
          }
        }.bind(this));

        window.addEventListener('keydown', function(e) {
          if (e.keyCode == 27 && this.isOpen) {
            this.close();
          }

          if (e.which == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }
        }.bind(this));

        this.modal.addEventListener('click', function(e) {
          if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
            this.close();
          }
        }.bind(this));
      }
      
    }

    open(selector) {
      this.previousActiveElement = document.activeElement;

      if (this.isOpen) {
        this.reOpen = true;
        this.close();
        return;
      }

      this.modalContainer = this._nextContainer;

      if (selector) {
        this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
      }

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();
      
      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);
      
      setTimeout(() => {
        this.options.isOpen(this);
        this.modalContainer.classList.add('animate-open');
        this.isOpen = true;
        this.focusTrap();
      }, this.speed);
    }
    
    close() {
      if (this.modalContainer) {
        this.modalContainer.classList.remove('animate-open');
        this.modalContainer.classList.remove(this.animation);
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove('modal-open');
        
        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();

        if (this.reOpen) {
          this.reOpen = false;
          this.open();
        }
      }
    }

    focusCatch(e) {
      const nodes = this.modalContainer.querySelectorAll(this._focusElements);
      const nodesArray = Array.prototype.slice.call(nodes);
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)
      if (e.shiftKey && focusedItemIndex === 0) {
        nodesArray[nodesArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus();
        e.preventDefault();
      }
    }

    focusTrap() {
      const nodes = this.modalContainer.querySelectorAll(this._focusElements);
      if (this.isOpen) {
        if (nodes.length) nodes[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }

    disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({
        top: pagePosition,
        left: 0
      });
      document.body.removeAttribute('data-position');
    }

    lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this._fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
      this._fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }

  burger.addEventListener('click', () => {
    menu.classList.add("menu-320__active");
    phone.classList.add("hidden");
    burger.classList.add("hidden");
    new GraphModal().open('modal');
  });


  Close.addEventListener('click', () => {
    menu.classList.remove("menu-320__active");
    phone.classList.remove("hidden");
    burger.classList.remove("hidden");
    new GraphModal().close();
  });

  // Наши проекты

  const slideOne = document.getElementById("slide1");
  const slideTwo = document.getElementById("slide2");
  const btnOne = document.getElementById("btn1");
  const btnTwo = document.getElementById("btn2");
  const btnThree = document.getElementById("btn321");
  const btnFour = document.getElementById("btn322");

  btnOne.addEventListener('click', function () {
    btnOne.classList.add('active-btn');
    btnTwo.classList.remove('active-btn');

    btnOne.setAttribute("aria-pressed", "true")
    btnTwo.setAttribute("aria-pressed", "false")

    slideOne.classList.remove('hidden');
    slideTwo.classList.add('hidden');
  });

  btnTwo.addEventListener('click', function() {
    btnOne.classList.remove('active-btn');
    btnTwo.classList.add('active-btn');

    btnTwo.setAttribute("aria-pressed", "true")
    btnOne.setAttribute("aria-pressed", "false")

    slideOne.classList.add('hidden');
    slideTwo.classList.remove('hidden');
  });

  btnThree.addEventListener('click', function () {
    btnThree.classList.add('active-btn');
    btnFour.classList.remove('active-btn');

    btnThree.setAttribute("aria-pressed", "true")
    btnFour.setAttribute("aria-pressed", "false")

    slideOne.classList.remove('hidden');
    slideTwo.classList.add('hidden');
  });

  btnFour.addEventListener('click', function() {
    btnThree.classList.remove('active-btn');
    btnFour.classList.add('active-btn');

    btnFour.setAttribute("aria-pressed", "true")
    btnThree.setAttribute("aria-pressed", "false")

    slideOne.classList.add('hidden');
    slideTwo.classList.remove('hidden');
  });

  // Услуги студии

  const switch1 = document.getElementById("switch1");
  const switch2 = document.getElementById("switch2");
  const switch3 = document.getElementById("switch3");
  const switch4 = document.getElementById("switch4");
  const services = document.getElementById("serv");
  const retouch = document.getElementById("retouch");

  switch1.addEventListener('click', function() {
    switch1.classList.add('active');
    switch2.classList.remove('active');

    switch1.setAttribute("aria-pressed", "true")
    switch2.setAttribute("aria-pressed", "false")

    retouch.classList.add('hidden');
    services.classList.remove('hidden');
  });

  switch3.addEventListener('click', function() {
    switch1.classList.add('active');
    switch2.classList.remove('active');

    switch3.setAttribute("aria-pressed", "true")
    switch4.setAttribute("aria-pressed", "false")

    services.classList.remove('hidden');
    retouch.classList.add('hidden');
  });

  switch2.addEventListener('click', function() {
    switch3.classList.remove('active');
    switch4.classList.add('active');

    switch2.setAttribute("aria-pressed", "true")
    switch1.setAttribute("aria-pressed", "false")

    services.classList.add('hidden');
    retouch.classList.remove('hidden');
  });

  switch4.addEventListener('click', function() {
    switch3.classList.remove('active');
    switch4.classList.add('active');

    switch4.setAttribute("aria-pressed", "true")
    switch3.setAttribute("aria-pressed", "false")

    services.classList.add('hidden');
    retouch.classList.remove('hidden');
  });


  // Validator

  new JustValidate('.about__form', {
    colorWrong: '#CACACA',
    borderColorWrong: '#F06666',
    rules: {
      email: {
        required: true,
        email: true,
      }
    },
    messages: {
      email: {
        email: 'Недопустимый формат',
        required: 'Это поле является обязательным'
      }

    },
    tooltip: {
    fadeOutTime: 20000 
    }
  });

  new JustValidate('.contacts__form', {
    colorWrong: '#202020',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },

      email: {
        required: true,
        email: true,
      }
      },
    messages: {
        name: {
          minLength: 'Недопустимый формат',
          maxLength: 'Это поле должно содержать максимум 20 символов',
          required: 'Это поле является обязательным'
        },
        email: {
          email: 'Недопустимый формат',
          required: 'Это поле является обязательным'
        }

    },
    tooltip: {
      fadeOutTime: 20000 
    }
});





}



