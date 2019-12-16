$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      $("#new_message")[0].reset();
      $('.postSend').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
      var buildHTML = function(message) {
        if (message.content && message.image) { 
          var html = `<div class="messagelist"p data-message-id="${message.id}">
                            <div class="messagelist__info">
                              <div class="messagelist__info--name">
                                ${message.user_name}
                              </div>
                              <div class="messagelist__info--timestamp">
                                ${message.created_at}
                              </div>
                            </div>
                            <div class="messagelist__text">
                            <p class="lower-message__content">
                              ${message.content}
                            </p>
                            <img src="${message.image}">
                            </img>
                          </div>
                        </div>`
          } else if (message.content){
            var html = `<div class="messagelist" data-message-id="${message.id}">
                            <div class="messagelist__info">
                              <div class="messagelist__info--name">
                                ${message.user_name}
                              </div>
                              <div class="messagelist__info--timestamp">
                                ${message.created_at}
                              </div>
                            </div>
                          <div class="messagelist__text">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                          </div>
                       </div>`
          }else if (message.image) {
            var html = `<div class="messagelist" data-message-id="${message.id}">
                            <div class="messagelist__info">
                              <div class="messagelist__info--name">
                                ${message.user_name}
                              </div>
                              <div class="messagelist__info--timestamp">
                                ${message.created_at}
                              </div>
                            </div>
                            <div class="messagelist__text">
                            <p class="lower-message__content">
                            <img src="${message.image}">
                            </img>
                            </p>
                            </div>
                        </div>`
          }
          return html;
        } 
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.messagelist:last').data("message-id"); 
      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = buildHTML(message)
          $('.messages').append(insertHTML);
         })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      .fail(function () {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});
