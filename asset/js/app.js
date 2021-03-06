function copyText() {
    var input = document.getElementById('shorturl');
    input.select(); // 选中文本
    document.execCommand('copy'); // 执行浏览器复制命令

    Swal.fire({
        allowOutsideClick: false,
        type: 'success',
        title: '复制成功！',
        showConfirmButton: false,
        timer: 3000
    });
}

var APP = (function () {
    var fn = {
            // 生成短地址
            setUrl: function (self) {
                var urlEl = document.getElementById('url'),
                    verifyCodeEl = document.getElementById('verifyCode'),
                    tips = '源网址',
                    request = {
                        url: urlEl.value,
                        verifyCode: verifyCodeEl.value
                    };
                fn.getJson(
                    'api/set.php',
                    true,
                    JSON.stringify(request),
                    function (res) {
                        if (res.success == 'true') {
                            //urlEl.className = 'focus';
                            //urlEl.value = res.content.url;
                            $res = document.getElementById('shorturl');
                            $res.className = 'focus';
                            $res.value = res.content.url;
                        } else {
                            urlEl.className = '';
                            urlEl.value = '';
                            verifyCodeEl.className = '';
                            verifyCodeEl.value = '';
                            // urlEl.setAttribute('placeholder', res.content);
                            // setTimeout(function () {
                            //     urlEl.setAttribute('placeholder', tips);
                            // }, 2000);
                            Swal.fire({
                                allowOutsideClick: true,
                                type: 'error',
                                title: res.content,
                                showConfirmButton: true,
                                showCloseButton: true,
                                timer: 3000
                            });
                        }
                    }
                );
            },
            // 获取 JSON 数据
            getJson: function (url, post, data, callback) {
                var xhr = new XMLHttpRequest(),
                    type = post ? 'POST' : 'GET';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var json = JSON.parse(xhr.responseText);
                        callback(json);
                    } else if (xhr.readyState == 4) {
                        callback(false);
                    }
                };
                xhr.open(type, url, true);
                xhr.send(data);
            }
        },
        init = function () {
            setTimeout(function () {
                var el = document.getElementsByTagName('html')[0];
                el.className = 'on';
            }, 10);
        };
    return { fn: fn, init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    APP.init();
});
