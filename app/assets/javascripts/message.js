$(function(){
  last_massage_id = $('.message:last').data('id')
  function buildHTML(message){
    var image = message.image == null ? "" : `<img src="${message.image} " id="lower-message__image" ">`
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">${message.user_name}</div>
                  <div class="upper-message__date">${message.created_at}</div>
                </div>
                <div class="lower-message">
                  <p lower-message__content>
                    ${message.content}
                  </p>
                  ${image}
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
      $("#new_message")[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
  })
  .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id =$(".message:last").data("message-id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      // last_idの記述はコントローラー側要注意
      .done(function(messages){
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message);
          //メッセージを追加  .append 要素追加 //メッセージを追加
          $('.messages').append(insertHTML);
        })
        //最新のメッセージが一番下に表示されようにスクロールする。
        if (messages.length > 0){
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function(i){
        alert('上手く更新できていないだぉ！！')
      });
      }
  };
  setInterval(reloadMessages, 7000);
});


