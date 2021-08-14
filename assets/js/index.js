$(function() {
  // 调用用户基本信息
  getUserInfo();

  var layer = layui.layer;
  $("#btnLogout").on("click", function() {
    layer.confirm("是否确定退出?", { icon: 3, title: "提示" }, function(index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function(res) {
      if (res.code !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      //   调用renderAvatar渲染头像;
      renderAvatar(res.data);
    }

    // complete: function(res) {
    //   console.log(res);
    //   console.log("执行了");
    //   if (
    //     res.responseJSON.code === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }
    // }
  });
}

function renderAvatar(user) {
  // 获取用户名称
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp&nbsp" + name);
  //   按需渲染用户头像
  if (user.user_pic !== null) {
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar")
      .html(first)
      .show();
  }
}
