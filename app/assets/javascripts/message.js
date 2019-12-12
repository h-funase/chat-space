$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="messageLists">
                    <div class="messageList">
                      <div class="messageList__info">
                        <div class="messageList__info--name">
                          ${message.user_name}
                        </div>
                        <div class="messageList__info--timestamp">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="messageList__text">
                      <p class="lower-message__content">
                        ${message.content}
                      <img src="${message.image}">
                      </img>
                      </p>
                      </div>
                    </div>
                  </div>`
    } else {
      var html = `<div class="messageLists">
                    <div class="messageList">
                      <div class="messageList__info">
                        <div class="messageList__info--name">
                          ${message.user_name}
                        </div>
                        <div class="messageList__info--timestamp">
                          ${message.created_at}
                        </div>
                      </div>
                    <div class="messageList__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    </div>
                  </div>
                </div>`
    }
    return html;
  }
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
})