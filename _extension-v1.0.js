/*
    Copyright 2024 FSC Team.
    All rights reserved.
*/

(function (_Scratch) {
    const {ArgumentType, BlockType, TargetType, Cast, translate, extensions, runtime} = _Scratch;

    translate.setup({
        zh: {
            'extensionName': 'JavaScratch',
            'open_tab-': '在新标签页上打开 [URL]',
            'open_red-': '在当前标签页上打开（重定向） [URL]',
            'close-': '关闭当前标签页',
            'refresh-': '刷新当前标签页',
            'jsURL.TEXT': '页面',
            'prompt-': '显示Prompt[MSG]，默认内容为[TEXT]',
            'prompt-.MSG_default': '这是一个Prompt！',
            'confirm-': '显示Confirm[MSG]',
            'confirm-.MSG_default': '我们要继续吗？',
            'alert-': '显示Alert[MSG]',
            'alert-.MSG_default': '你好，这里是JavaScratch',
            'vanilla_jsw.TEXT' : '弹窗',
            'jsn.TEXT' : '通知' ,
            'c_notification-': '检测浏览器是否支持Notification',
            'notification-': '弹出Notification，标题[TITLE]内容[CONTENT]，附加图标URL[ICON]',
            'jsclip.TEXT': '更多功能',
            'clipboard-': '使用 [OPTIONS] 复制 [CONTENT] 到剪贴板',
            'c_clipboard-': '检测浏览器是否支持使用 [OPTIONS] 复制文本',
            'manual': '用户使用手册'
        },
        en: {
            'extensionName': 'JavaScratch',
            'open_tab-': 'Open on new tab [URL]',
            'open_red-': 'Open on this tab (Redirect) [URL]',
            'close-': 'Close current tab',
            'refresh-': 'Refresh current tab',
            'jsURL.TEXT': 'Pages',
            'prompt-': 'Show Prompt[MSG], the default content was[TEXT]',
            'prompt-.MSG_default': 'This is a Prompt!',
            'confirm-': 'Show Confirm[MSG]',
            'confirm-.MSG_default': 'Should we continue?',
            'alert-': 'Show Alert[MSG]',
            'alert-.MSG_default': 'Hello, this is JavaScratch',
            'vanilla_jsw.TEXT' : 'Splash Window' ,
            'jsn.TEXT' : 'Notifications' ,
            'c_notification-': 'Is the browser supports Notification?',
            'notification-': 'Pop up a Notification, title [TITLE] content [CONTENT], additional icon URL [ICON]',
            'jsclip.TEXT': 'More Functions',
            'clipboard-': 'Copy [CONTENT] to clipboard using [OPTIONS]',
            'c_clipboard-': 'Is the browser supports copy text using [OPTIONS]?',
            'manual': 'User Manual (Chinese)'
        }
    });
    class Extension {
        constructor (_runtime) {
            this._runtime = _runtime;
        }

        getInfo () {

            const jsURL = {
                blockType: BlockType.LABEL, 
                text: translate({id: 'jsURL.TEXT'})
            };

            const open_nt_ = {
                opcode: '_open_nt',
                blockType: BlockType.COMMAND,
                text: translate({id: 'open_tab-'}),
                arguments: {
                    URL: {
                        type: ArgumentType.STRING,
                        defaultValue: 'https://www.example.com/'
                    },
                }
            };

            const open_tt_ = {
                opcode: '_open_tt',
                blockType: BlockType.COMMAND,
                text: translate({id: 'open_red-'}),
                arguments: {
                    URL: {
                        type: ArgumentType.STRING,
                        defaultValue: 'https://www.example.com/'
                    },
                }
            };

            const refresh_ = {
                opcode: '_refresh',
                blockType: BlockType.COMMAND,
                text: translate({id: 'refresh-'})
            };

            const close_ = {
                opcode: '_close',
                blockType: BlockType.COMMAND,
                text: translate({id: 'close-'})
            };

            const prompt_ = {
                opcode: '_prompt',
                blockType: BlockType.REPORTER,
                text: translate({id: 'prompt-'}),
                arguments: {
                    MSG: {
                        type: ArgumentType.STRING,
                        defaultValue: translate({id: 'prompt-.MSG_default'})
                    },
                    TEXT: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Hello World!'
                    }
                }
            };

            const confirm_ = {
                opcode: '_confirm',
                blockType: BlockType.BOOLEAN,
                text: translate({id: 'confirm-'}),
                arguments: {
                    MSG: {
                        type: ArgumentType.STRING,
                        defaultValue: translate({id: 'confirm-.MSG_default'})
                    },
                }
            };

            const alert_ = {
                opcode: '_alert',
                blockType: BlockType.COMMAND,
                text: translate({id: 'alert-'}),
                arguments: {
                    MSG: {
                        type: ArgumentType.STRING,
                        defaultValue: translate({id: 'alert-.MSG_default'})
                    },
                }
            };

            const vanilla_jsw = {
                    blockType: BlockType.LABEL, 
                    text: translate({id: 'vanilla_jsw.TEXT'})
                };

            const c_notification_ = {
                opcode: "_c_notification",
                blockType: BlockType.BOOLEAN,
                text: translate({id: 'c_notification-'}),
            };

            const notification_ = {
                opcode: "_notification",
                blockType: BlockType.COMMAND,
                text: translate({id: 'notification-'}),
                arguments: {
                    TITLE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Hello CCW'
                    },
                    CONTENT: {
                        type: ArgumentType.STRING,
                        defaultValue: 'JavaScratch by FSC Team'
                    },
                    ICON: {
                        type: ArgumentType.STRING,
                        defaultValue: 'https://extensions.turbowarp.org/dango.png'
                    }
                }
            };

            const jsn = {
                    blockType: BlockType.LABEL, 
                    text: translate({id: 'jsn.TEXT'})
                };

            const jsclip = {
                    blockType: BlockType.LABEL, 
                    text: translate({id: 'jsclip.TEXT'})
                };

            const clipboard_ = {
                opcode: "_clipboard",
                blockType: BlockType.COMMAND,
                text: translate({id: 'clipboard-'}),
                arguments: {
                    CONTENT: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Extension by awa_Eric@CCW'
                    },
                    OPTIONS: {
                        type: ArgumentType.STRING,
                            menu: 'clipboardMenu', 
                            defaultValue: 'Clipboard API'
                    }
                }
            };

            const c_clipboard_ = {
                opcode: "_c_clipboard",
                blockType: BlockType.BOOLEAN,
                text: translate({id: 'c_clipboard-'}),
                arguments: {
                    OPTIONS: {
                        type: ArgumentType.STRING,
                            menu: 'clipboardMenu', 
                            defaultValue: 'Clipboard API'
                    }
                }
            };

            const manual_ = {
                opcode: '_manual',
                blockType: BlockType.BUTTON,
                text: translate({id: 'manual'})
            };

            return {
                id: 'javaScratch',
                color1: '#157DC9',
                color2: '#1163A1',
                blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiIGNsYXNzPSJiaSBiaS1jb2RlLXNsYXNoIiB2aWV3Qm94PSIwIDAgMTYgMTYiPiAgIDxwYXRoIGQ9Ik0xMC40NzggMS42NDdhLjUuNSAwIDEgMC0uOTU2LS4yOTRsLTQgMTNhLjUuNSAwIDAgMCAuOTU2LjI5NGw0LTEzek00Ljg1NCA0LjE0NmEuNS41IDAgMCAxIDAgLjcwOEwxLjcwNyA4bDMuMTQ3IDMuMTQ2YS41LjUgMCAwIDEtLjcwOC43MDhsLTMuNS0zLjVhLjUuNSAwIDAgMSAwLS43MDhsMy41LTMuNWEuNS41IDAgMCAxIC43MDggMHptNi4yOTIgMGEuNS41IDAgMCAwIDAgLjcwOEwxNC4yOTMgOGwtMy4xNDcgMy4xNDZhLjUuNSAwIDAgMCAuNzA4LjcwOGwzLjUtMy41YS41LjUgMCAwIDAgMC0uNzA4bC0zLjUtMy41YS41LjUgMCAwIDAtLjcwOCAweiIvPiA8L3N2Zz4=',
                name: translate({id: 'extensionName'}),
                blocks: [jsURL,open_nt_,open_tt_,refresh_,close_,vanilla_jsw,alert_,prompt_,confirm_,jsn,notification_,c_notification_,jsclip,clipboard_,c_clipboard_],
                menus: {
                    menuA: {
                        acceptReporters: true,
                        items: [/* ...*/] || 'getItemsForMenu'
                    },
                    clipboardMenu: ['execCommand', 'Clipboard API'] // 剪贴板菜单的选项
                }
            };
        }

        getItemsForMenu () {
            return [{text: '1', value: 1}];
        }

        // Pages
        _open_nt (args) {
            const {URL = ''} = args;
            const url = Cast.toString(URL);

            window.open(url, '_blank');
        }

        _open_tt (args) {
            const {URL = ''} = args;
            const url = Cast.toString(URL);

            location.href = url;
        }

        _close () {
            window.close()
        }

        _refresh () {
            window.location.reload()
        }

        // Splash Windows
        _prompt (args) {
            const {MSG = '', TEXT = ''} = args;
            const msg = Cast.toString(MSG);
            const text = Cast.toString(TEXT);
            
            return window.prompt(msg,text);
        }
        
        _confirm (args) {
            const {MSG = ''} = args;
            const msg = Cast.toString(MSG);
            
            return window.confirm(msg);
        }

        _alert (args) {
            const {MSG = ''} = args;
            const msg = Cast.toString(MSG);
            
            window.alert(msg);
        }

        // Notifications
        _c_notification () {
            if ("Notification" in window) {
                return true;
            }
            else {
                return false;
            }
        }

        _notification (args) {
            const {TITLE = '',CONTENT = '', ICON = ''} = args;
            const title = Cast.toString(TITLE);
            const content = Cast.toString(CONTENT);
            const icon = Cast.toString(ICON);

            if (Notification.permission === "granted") {

                var notification = new Notification(title, {
                body: content,
                icon: icon
                });
            } else if (Notification.permission !== "denied") {

                Notification.requestPermission().then(function (permission) {

                if (permission === "granted") {
                    var notification = new Notification(title, {
                    body: content,
                    icon: icon
                    });
                }
                });
            }
        }

        // Clipboard
        _clipboard (args) {
            const {CONTENT = '', OPTIONS = ''} = args;
            const content = Cast.toString(CONTENT);
            const options = Cast.toString(OPTIONS);

            if (options == 'execCommand'){

                const textarea = document.createElement('textarea');
                textarea.value = content;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

            }
            else {
                
                const clipboard = navigator.clipboard || window.clipboard;
                clipboard.writeText(content)

            }
        }

        _c_clipboard (args) {
            const { OPTIONS = ''} = args;
            const options = Cast.toString(OPTIONS);

            if (options == 'execCommand'){
                return document.queryCommandSupported && document.queryCommandSupported('copy');
            }
            else {
                return 'clipboard' in navigator;
            }
        }

        _manual () {
            window.prompt('CCW Learn URL','https://learn.ccw.site/article/0fc4c35b-f212-40fa-804d-04b14947a4d5');
        }

    }

    extensions.register(new Extension(runtime));
}(Scratch));
