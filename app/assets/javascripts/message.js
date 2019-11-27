$(function(){
  last_massage_id = $('.message:last').data('id')
  function buildHTML(message){

    var image = message.image?`<img src="${message.image}">`:  " "  ;
    var html = `<div class="message" data-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">${message.user_name}</div>
                  <div class="upper-message__date">${message.date}</div>
                </div>
                <div class="lower-message">
                  ${message.content}
                  ${image}
                </div>
                </div>
                `
    return html;
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
  $.ajax({
    url: url,  //同期通信でいう『パス』
    type: 'POST',  //同期通信でいう『HTTPメソッド』
    data: formData,  
    dataType: 'json',
    processData: false,
    contentType: false
  })
  
  .done(function(data){
    console.table(data)
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

    $('.form__submit').prop('disabled', false);
  })
  .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  
  var reloadMessages = function() {
    last_massage_id = $('.message').data('id')
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: '/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_massage_id}
    })
    .done(function(messages) {
    })
    .fail(function() {
      console.log('error');
    });    
  };
  setInterval(reloadMessages, 7000);
})


