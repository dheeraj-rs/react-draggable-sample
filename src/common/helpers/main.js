/* eslint-disable func-names */
/* eslint-disable no-multi-assign */
import * as bootstrap from 'bootstrap';
import cash from 'cash-dom';
import $ from 'jquery';

window.bootstrap = bootstrap;
window.cash = window.$ = cash;

cash(() => {});

window.onload = function () {
  // user search inbox

  $('.search-user-list').on('keyup', () => {
    $('.inbox-user-listing').addClass('d-none');
    $('.inbox-search-list').removeClass('d-none');
  });

  // meeting config web
  $('input[name=radio-business]').on('change', function () {
    const optionVal = $(this).attr('data-value');
    if (optionVal === 'business') {
      $('#custom-hours').addClass('d-none');
      $('#business-hours').removeClass('d-none');
    } else {
      $('#custom-hours').removeClass('d-none');
      $('#business-hours').addClass('d-none');
    }
  });
  // meeting config mob
  $('input[name=radio-business-mob]').on('change', function () {
    const optionVal = $(this).attr('data-value');
    if (optionVal === 'business-mob') {
      $('#custom-hours-mob').addClass('d-none');
      $('#business-hours-mob').removeClass('d-none');
    } else {
      $('#custom-hours-mob').removeClass('d-none');
      $('#business-hours-mob').addClass('d-none');
    }
  });

  // collapse functionality

  $('#collapse-right').on('click', () => {
    $('#collapse-right').addClass('d-none');
    $('#expand-left').removeClass('d-none');
    $('#right-section').removeClass('d-lg-block');
    $('.telephony-right-section').removeClass('d-lg-block');
    $('#collapsed-sidebar').removeClass('d-none');
    $('#chat-expand').addClass('animation-expand');
    $('#chat-expand').toggleClass('col-lg-8 col-lg-11');
  });

  $('#expand-left').on('click', () => {
    $('#collapse-right').removeClass('d-none');
    $('#expand-left').addClass('d-none');
    $('#right-section').addClass('d-lg-block');
    $('.telephony-right-section').addClass('d-lg-block');
    $('#right-section').addClass('animation-expand');
    $('#chat-expand').removeClass('animation-expand');
    $('#collapsed-sidebar').addClass('d-none');
    $('#chat-expand').toggleClass('col-lg-11 col-lg-8');
    $('.gs-infowindow').addClass('animation');
  });

  // switcher icon toggle
  $('.switcher').on('click', 'li', function () {
    // remove classname 'active' from all li who already has classname 'active'
    $('.switcher li.active').removeClass('active');
    // adding classname 'active' to current click li
    $(this).addClass('active');
  });

  $('.nav-link-side').on('click', function () {
    // remove classname 'active' from all li who already has classname 'active'
    $('.nav-link-side.active').removeClass('active');
    // adding classname 'active' to current click li
    $(this).addClass('active');
  });

  // header search

  $('.global-search').on({
    focus() {
      $('.search-global-icon').addClass('search-global-icon-bg');
    },

    blur() {
      $('.search-global-icon').removeClass('search-global-icon-bg');
      // $('.search-suggestion').addClass('d-none');
      $('#searchGlobal').val('');
    },
  });

  // $('.global-search').on('keyup', () => {
  //   $('.search-suggestion').removeClass('d-none');
  // });
  // function focusIn() {
  //   document.getElementById("searchGlobal").focus();
  // }

  // header search - tab and mobile view
  $('#headerSearchIcon').on('click', () => {
    $('#headerMobSearch').removeClass('d-none');
    $('#mainHeader').addClass('d-none');
    // $('.global-search-mob').focus();
    document.getElementsByClassName('global-search-mob')[0].focus();
  });

  // header responsive search back button

  $('#searchBackBtn').on('click', () => {
    $('#headerMobSearch').addClass('d-none');
    $('#mainHeader').removeClass('d-none');
  });

  $('.dropdown-menu').on('click', (e) => {
    e.stopPropagation();
  });

  // custom filter show and hide
  $('#custom-filter').on('click', () => {
    $('.custom-filter-box').toggleClass('d-none d-block');
  });

  // label added ribbon show
  $('#addLabel').on('click', () => {
    $('#labelTextChat').removeClass('d-none');
  });
  // ticket creation
  $('.assign-ticket').on('click', () => {
    $('#reopenModalBtn').removeClass('d-none');
    $('#resolveModalBtn').addClass('d-none');
    $('#ticketListingChat').removeClass('d-none');
  });

  // ticket reopen
  $('#ticketReopen').on('click', () => {
    $('#ticketReopenChat').removeClass('d-none');
  });
  // resolve ticket
  $('#resolveTicketBtn').on('click', () => {
    $('#reopenModalBtn').removeClass('d-none');
    $('#resolveModalBtn').addClass('d-none');
    $('#ticketListingChat').removeClass('d-none');
  });

  // custom filter box cancel event
  $('#custom-filter-cancel').on('click', () => {
    $('#custom-filter-box').removeClass('d-block');
    $('#custom-filter-box').addClass('d-none');
  });

  // Toggle chat and links
  function toggleFab() {
    // $('.prime').toggleClass('is-active');
    $('#prime').toggleClass('is-float');
    $('.fab').toggleClass('is-visible');
    $('.fab-close').toggleClass('is-active');
    $('#prime').toggleClass('float-rotation-effect');
  }

  // Ripple effect
  let target;
  let ink;
  let d;
  let x;
  let y;
  $('.fab').on('click', function (e) {
    target = $(this);
    // create .ink element if it doesn't exist
    if (target.find('.ink').length === 0) {
      target.prepend("<span className='ink'></span>");
    }

    ink = target.find('.ink');
    // incase of quick double clicks stop the previous animation
    ink.removeClass('animate');

    // set size of .ink
    if (!ink.height() && !ink.width()) {
      d = Math.max(target.outerWidth(), target.outerHeight());
      ink.css({
        height: d,
        width: d,
      });
    }

    // get click coordinates
    x = e.pageX - target.offset().left - ink.width() / 2;
    y = e.pageY - target.offset().top - ink.height() / 2;

    // set the position and add class .animate
    ink
      .css({
        top: `${y}px`,
        left: `${x}px`,
      })
      .addClass('animate');
  });

  // Fab click
  $('#prime').on('click', () => {
    toggleFab();
  });

  // floating box hide on the outside click
  $('.fab-close').on('click', () => {
    toggleFab();
  });

  // fab hide on body click

  $(document).on('click', (event) => {
    if (!$(event.target).closest('#prime,#fabs').length) {
      // ... clicked on the 'body', but not inside of #menutop
      if ($('.is-active').length > 1) {
        toggleFab();
      }
    }
  });

  // stored response search

  $('#storedInputSearch').on('keyup', () => {
    $('#storedResponseSearchWrap').removeClass('d-none');
    $('#searchListItems').addClass('d-none');
  });

  // stored response details

  $('.sr-title-link').on('click', () => {
    $('#stored-response-float').removeClass('show');
  });
  // stored response back

  $('#stored-response-search-back').on('click', () => {
    $('#stored-response-search').removeClass('show');
  });

  // share calendar

  $('#shareCalendar').on('click', () => {
    $('#sentCalendar').removeClass('d-none');
    $('#stored-response-calendar').removeClass('show');
  });

  // team member back click

  $('#teamMemberBack').on('click', () => {
    $('#team-calendar').removeClass('show');
    // $('#stored-response-calendar').addClass('show')
  });
  // share team member calendar
  $('#shareToTeamMember').on('click', () => {
    $('#stored-response-calendar').removeClass('show');
  });

  // sent private note
  $('#sendPrivateNoteBtn').on('click', () => {
    $('#sentPrivateNote').removeClass('d-none');
  });

  // on mobile - click on inbox chat - show the chat section
  $('.card-list').on('click', () => {
    $('#chat-expand').removeClass('d-none');
    $('.panel-left').addClass('d-none d-lg-block');
  });

  $('#backBtn').on('click', () => {
    $('#chat-expand').addClass('d-none');
    $('.panel-left').removeClass('d-none');
  });

  // stored response page on mobile and web
  $('.stored-response').on('click', () => {
    $('#chat-expand').removeClass('d-none');
    $('.panel-left').addClass('d-none  d-lg-block');
    // $('.top-nav').addClass('d-none')
  });

  $('#backBtnStored').on('click', () => {
    $('#chat-expand').addClass('d-none');
    $('.panel-left').removeClass('d-none');
    // $('.top-nav').removeClass('d-none');
  });

  $('.backBtn').on('click', () => {
    $('.left-sec').addClass('d-none');
    $('.right-sec').removeClass('d-none');
  });

  $('.rgt-btn').on('click', () => {
    $('.right-sec').addClass('d-none');
    $('.left-sec').removeClass('d-none');
  });
  // chat widget tab mobile
  // on mobile - click on settings tab - show the content section
  $('.chat-list-social').on('click', () => {
    $('#tab-expand').removeClass('d-none');
    $('.panel-social').addClass('d-none d-lg-block');
    $('#channel-box').removeClass('d-none');
  });

  $('#backBtnWidget').on('click', () => {
    $('.panel-social').removeClass('d-none');
    $('#tab-expand').addClass('d-none');
  });

  // file library click close the box
  $('#file-library').on('click', () => {
    $('#stored-response-attachment').removeClass('show');
  });
  // file system click close the box
  $('#file-system').on('click', () => {
    $('#stored-response-attachment').removeClass('show');
  });
  // dropdown left status close

  $('.filter-item').each(function () {
    $(this).on('click', function () {
      const selectedText = $(this).text();
      $('#selectedVal').text(selectedText);
      $('#dropdown-left-status').removeClass('show');
    });
  });

  $('#assignedAgentSubmit').on('click', () => {
    $('#assignedAgent').removeClass('d-none');
    $('#assignAgentBtn').addClass('d-none');
  });
  // assign agent cancel
  $('#assignAgentCancel').on('click', () => {
    $('#agent-wrap').removeClass('show');
  });
  // ticket active state

  $('.existing-ticket-list').on('click', function () {
    $('.existing-ticket-list.existing-ticket-list-active').removeClass(
      'existing-ticket-list-active'
    );
    $(this).addClass('existing-ticket-list-active');
  });

  $(document).on('click', (e) => {
    // calendar
    if ($(e.target).closest('#stored-response-calendar').length === 0) {
      $('#stored-response-calendar').removeClass('show');
    }
    // stored response
    if ($(e.target).closest('#stored-response-float').length === 0) {
      $('#stored-response-float').removeClass('show');
    }
    // stored response search
    if ($(e.target).closest('#stored-response-search').length === 0) {
      $('#stored-response-search').removeClass('show');
    }
    // team mate calendar
    if ($(e.target).closest('#team-calendar').length === 0) {
      $('#team-calendar').removeClass('show');
    }
    // file attachment
    if ($(e.target).closest('#stored-response-attachment').length === 0) {
      $('#stored-response-attachment').removeClass('show');
    }
    // header search
    // if ($(e.target).closest('#search-suggestion').length === 0) {
    //   $('#search-suggestion').addClass('d-none');
    // }
    // shift + # stored response
    // if ($(e.target).closest('#stored-response-shift').length === 0) {
    //   $('#stored-response-shift').removeClass('show');
    // }
    // filter collapse hide
    if ($(e.target).closest('#dropdown-menu-filter').length === 0) {
      $('#dropdown-menu-filter').removeClass('show');
    }
    // dialpad right web
    if ($(e.target).closest('#dropdown-dial-box-web').length === 0) {
      $('#dropdown-dial-box-web').removeClass('show');
    }
  });

  $('#fileAttachBtn').on('click', () => {
    $('#attachedFilesChatBox').removeClass('d-none');
    $('#chatTextBox').addClass('chat-text-box-with-attach');
  });
  // file send to chat area
  $('#chatSendBtn').on('click', (event) => {
    // it's dummy code for showing action
    const attachFileList = document.getElementById('attachedFilesChatBox').classList.item(4);
    if (attachFileList === 'd-none') {
      event.stopPropagation();
    } else {
      $('#fileListingChatBox').removeClass('d-none');
      $('#attachedFilesChatBox').addClass('d-none');
      $('#chatTextBox').removeClass('chat-text-box-with-attach');
    }

    const attachImageList = document.getElementById('attachedImagesChatBox').classList.item(4);
    if (attachImageList === 'd-none') {
      event.stopPropagation();
    } else {
      $('#galleryChatArea').removeClass('d-none');
      $('#attachedImagesChatBox').addClass('d-none');
      $('#chatTextBox').removeClass('chat-text-box-with-attach');
    }

    // on click send text to chat area
    const typedText = $('#chatTextBox').val();
    if (typedText) {
      $('#realText').text(typedText);
      $('#liveChat').removeClass('d-none');
      $('#chatTextBox').val('');
    }
  });
  // attached file removal from chat type box

  $('.file-remove').on('click', () => {
    const numItems = $('.file-remove').length;
    if (numItems === '1') {
      $('#attachedFilesChatBox').addClass('d-none');
      $('#chatTextBox').removeClass('chat-text-box-with-attach');
    }
  });

  $('.image-remove').on('click', () => {
    const numItems = $('.image-remove').length;
    if (numItems === '1') {
      $('#attachedImagesChatBox').addClass('d-none');
      $('#chatTextBox').removeClass('chat-text-box-with-attach');
    }
  });
  // chat widget scripts starts
  // dropdown widget toggle close on click
  $('.dropdown-channel').on('click', () => {
    $('.dropdown-widget').removeClass('show');
  });

  // resolve close

  $('.resolve').on('click', () => {
    $('#dropdownResolve').removeClass('show');
  });

  // widget angle active
  $('.widget-angle-1').on('click', function () {
    $('.widget-angle-2').removeClass('border-border-active');
    $(this).addClass('border-border-active');
    $('.bottom-right').removeClass('bg-blue-active');
    $('.bottom-right').addClass('bg-periwinkle-grey');
    $('.bottom-left').addClass('bg-blue-active');
    $('.bottom-left').removeClass('bg-periwinkle-grey');
    $('.filter-right-img').removeClass('filter-active');
    $('.filter-left-img').removeClass('filter-inactive').addClass('filter-active');
    $('.offset-right-label').text('Offset left (px)');

    $('#rightOffset').addClass('d-none');
    $('#leftOffset').removeClass('d-none');
  });

  $('.widget-angle-2').on('click', function () {
    $('.widget-angle-1').removeClass('border-border-active');
    $(this).addClass('border-border-active');
    $('.bottom-right').addClass('bg-blue-active');
    $('.bottom-right').removeClass('bg-periwinkle-grey');
    $('.bottom-left').removeClass('bg-blue-active');
    $('.bottom-left').addClass('bg-periwinkle-grey');
    $('.filter-right-img').addClass('filter-active');
    $('.filter-left-img').addClass('filter-inactive').removeClass('filter-active');

    $('#rightOffset').removeClass('d-none');
    $('#leftOffset').addClass('d-none');
    $('.offset-right-label').text('Offset right (px)');
  });

  // chat support theme active

  $('.gradient-section').on('click', function () {
    $('.gradient-section').removeClass('border-blue-active');
    $(this).addClass('border-blue-active');
    $('.opacity').removeClass('opacity-50');
    $('#updateTheme').removeClass('d-none');
  });
  // custom theme click
  $('#customThemeBox').on('click', () => {
    $('#updateTheme').addClass('d-none');
    $('#newTheme').removeClass('d-none');
  });

  // chat icon  click
  $('.common-hover').on('click', function () {
    $('.common-hover').removeClass('common-hover-active');
    $(this).addClass('common-hover-active');
  });
  // default theme box
  $('.default-theme-box').on('click', () => {
    $('#updateTheme').removeClass('d-none');
    $('#newTheme').addClass('d-none');
  });
  // default theme click

  $('#defaultTheme').on('click', () => {
    $('.opacity').addClass('opacity-50');
    $('#newTheme').addClass('d-none');
    $('#updateTheme').addClass('d-none');
  });
  // banner circle active

  $('.banner-circle').on('click', function () {
    $('.banner-circle').removeClass('border-blue-active');
    $(this).addClass('border-blue-active');
  });
  // file upload preview
  $('#choose-file').on('change', () => {
    $('#attachedImagesChatBox').removeClass('d-none');
    $('#chatTextBox').addClass('chat-text-box-with-attach');
    toggleFab();
  });

  // search with border focus event
  $('.search-input').on({
    focus() {
      $(this).closest('.search-input-group').find('.search-input-text').addClass('border-0');
    },
    blur() {
      $(this).closest('.search-input-group').find('.search-input-text').removeClass('border-0');
    },
  });

  // side menu logo
  if (window.location.href.indexOf('support-widget') > -1) {
    $('.support-logo').removeClass('d-none');
  } else if (window.location.href.indexOf('comm-telephony') > -1) {
    $('.voice-logo').removeClass('d-none');
  } else {
    $('.main-logo').removeClass('d-none');
    $('.support-logo').addClass('d-none');
    $('.voice-logo').addClass('d-none');
  }
};
