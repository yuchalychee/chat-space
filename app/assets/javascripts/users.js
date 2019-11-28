  $(function() {
  function addUser(message) {

    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${message.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${message.id}" data-user-name="${message.name}">追加</div>
              </div>
               `;
               $("#user-search-result").append(html);
  }

  function addNoUser() {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>
               `;
               $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    var html = `
              <div class="chat-group-user clearfix" id="${id}"
              style="
                line-height: 50px;
                padding: 0 15px;
                font-size: 14px;
              ">
                <p class="ChatMember__name"
                  style="  
                  float: left;
                ">${name}</p>

                <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}"
                  style="
                  float: right;
                  color: #f05050;
                ">削除</div>
              </div>
              `;
              $("#chat-group-users").append(html);
  }

  function addMember(userId) {
    var html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
      
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
          // 条件が真であれば実行 
           //配列オブジェクト１つ１つに対する処理
          } else if (input.length == 0) {
            return false;
          } else {
            addNoUser();
          }
       })
       .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
   });
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).data('user-name');
    const userId = $(this).data('user-id');
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});