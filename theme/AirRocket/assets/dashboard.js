// AirRocket Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // 初始化仪表板
    initDashboard();

    function initDashboard() {
        // 初始化侧边栏功能
        initSidebar();
        
        // 初始化复制功能
        initCopyFunctions();
        
        // 初始化客户端下载
        initClientDownloads();
        
        // 初始化按钮事件
        initButtonEvents();
        
        // 初始化响应式菜单
        initResponsiveMenu();
        
        // 初始化动画
        initAnimations();
        
        // 初始化主题和语言
        initThemeAndLanguage();
        
        console.log('🚀 AirRocket Dashboard 已初始化');
    }

    // 侧边栏功能
    function initSidebar() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            // 为退出登录添加特殊处理
            if (item.getAttribute('href') === '/logout') {
                return; // 跳过退出登录链接，让它使用默认行为
            }
            
            item.addEventListener('click', function(e) {
                // 移除其他活动状态
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // 添加当前活动状态
                this.classList.add('active');
                
                // 获取导航文本用于页面标题更新
                const navText = this.querySelector('.nav-text').textContent;
                updatePageTitle(navText);
                
                // 添加点击动画效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // 让链接正常跳转
                // 不阻止默认行为，让 <a> 标签正常工作
            });
        });
        
        // 根据当前URL设置活动状态
        setActiveNavItem();
    }
    
    // 根据当前URL设置活动导航项
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && currentPath === href) {
                item.classList.add('active');
            } else if (href === '/user' && currentPath === '/') {
                // 如果在根目录，激活控制面板
                item.classList.add('active');
            }
        });
    }

    // 复制功能
    function initCopyFunctions() {
        const copyBtn = document.querySelector('.btn-copy');
        const subscriptionInput = document.querySelector('.subscription-input input');
        
        if (copyBtn && subscriptionInput) {
            copyBtn.addEventListener('click', function() {
                // 选择文本
                subscriptionInput.select();
                subscriptionInput.setSelectionRange(0, 99999); // 移动端兼容
                
                // 复制到剪贴板
                try {
                    document.execCommand('copy');
                    showNotification('✅ 订阅链接已复制到剪贴板', 'success');
                    
                    // 按钮反馈动画
                    this.style.background = 'rgba(24, 207, 150, 0.3)';
                    this.innerHTML = '✅';
                    
                    setTimeout(() => {
                        this.style.background = '';
                        this.innerHTML = '📋';
                    }, 2000);
                } catch (err) {
                    showNotification('❌ 复制失败，请手动复制', 'error');
                }
            });
        }
    }

    // 客户端下载功能
    function initClientDownloads() {
        const clientCards = document.querySelectorAll('.client-card');
        
        clientCards.forEach(card => {
            card.addEventListener('click', function() {
                const downloadUrl = this.getAttribute('data-download-url');
                const clientName = this.querySelector('.client-name').textContent;
                
                // 添加下载动画
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    
                    if (downloadUrl && downloadUrl.trim() !== '') {
                        showNotification(`🚀 正在打开 ${clientName} 下载...`, 'success');
                        
                        // 实际下载
                        setTimeout(() => {
                            window.open(downloadUrl, '_blank');
                        }, 500);
                    } else {
                        showNotification(`❌ ${clientName} 下载链接未配置，请联系管理员`, 'warning');
                    }
                }, 200);
            });
            
            // 添加悬停效果提示
            card.addEventListener('mouseenter', function() {
                const downloadUrl = this.getAttribute('data-download-url');
                if (!downloadUrl || downloadUrl.trim() === '') {
                    this.style.cursor = 'not-allowed';
                    this.style.opacity = '0.7';
                } else {
                    this.style.cursor = 'pointer';
                    this.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.cursor = 'pointer';
                this.style.opacity = '1';
            });
        });
    }

    // 按钮事件
    function initButtonEvents() {
        // 充值按钮
        const rechargeButtons = document.querySelectorAll('.btn-recharge, .btn-primary');
        rechargeButtons.forEach(btn => {
            if (btn.textContent.includes('充值') || btn.textContent.includes('立即充值')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('💰 正在跳转到充值页面...', 'info');
                    
                    // 添加加载动画
                    const originalText = this.textContent;
                    this.textContent = '加载中...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.disabled = false;
                        // 这里可以添加实际的充值页面跳转
                        // window.location.href = '/recharge';
                    }, 2000);
                });
            }
        });

        // 邀请按钮
        const inviteBtn = document.querySelector('.btn-invite');
        if (inviteBtn) {
            inviteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('🎉 邀请功能准备中...', 'info');
                
                // 动画效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }

        // 工具按钮
        const toolButtons = document.querySelectorAll('.tool-btn');
        toolButtons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const tools = ['导入手机', '流量统计', '速度测试', '节点导入', '使用统计', '帮助文档'];
                const toolName = tools[index] || '工具';
                
                showNotification(`🛠️ ${toolName}功能准备中...`, 'info');
                
                // 动画反馈
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }

    // 响应式菜单
    function initResponsiveMenu() {
        // 创建菜单切换按钮（移动端）
        const topBar = document.querySelector('.top-bar-left');
        if (topBar && window.innerWidth <= 1024) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                margin-right: 1rem;
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            topBar.insertBefore(menuToggle, topBar.firstChild);
            
            // 菜单切换事件
            menuToggle.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('open');
                
                // 切换图标
                this.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
            });
        }

        // 处理窗口大小变化
        window.addEventListener('resize', function() {
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth > 1024) {
                sidebar.classList.remove('open');
            }
        });
    }

    // 动画初始化
    function initAnimations() {
        // 添加滚动动画观察器
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // 观察所有卡片元素
            const cards = document.querySelectorAll('.welcome-card, .client-card, .subscription-section, .invite-card, .notification-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }

        // 添加悬停动效
        const interactiveElements = document.querySelectorAll('.client-card, .nav-item, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // 通知系统
    function showNotification(message, type = 'info') {
        // 移除现有通知
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        notification.textContent = message;
        
        // 样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // 获取通知颜色
    function getNotificationColor(type) {
        const colors = {
            'success': 'rgba(24, 207, 150, 0.9)',
            'error': 'rgba(239, 68, 68, 0.9)',
            'warning': 'rgba(245, 158, 11, 0.9)',
            'info': 'rgba(59, 130, 246, 0.9)'
        };
        return colors[type] || colors.info;
    }

    // 更新页面标题
    function updatePageTitle(title) {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = title;
        }
    }

    // 实时时间更新（用于日历组件）
    function updateTime() {
        const now = new Date();
        const calendarNumber = document.querySelector('.calendar-number');
        const calendarDate = document.querySelector('.year');
        
        if (calendarNumber) {
            calendarNumber.textContent = now.getDate();
        }
        
        if (calendarDate) {
            const year = now.getFullYear();
            calendarDate.innerHTML = `${year.toString().slice(0, 2)}<span class="highlight">${year.toString().slice(2)}</span>`;
        }
    }

    // 每分钟更新一次时间
    updateTime();
    setInterval(updateTime, 60000);

    // 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + C 在订阅链接输入框获得焦点时复制
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            const subscriptionInput = document.querySelector('.subscription-input input');
            if (document.activeElement === subscriptionInput) {
                const copyBtn = document.querySelector('.btn-copy');
                if (copyBtn) {
                    copyBtn.click();
                }
            }
        }

        // Esc 键关闭侧边栏（移动端）
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) {
                    menuToggle.innerHTML = '☰';
                }
            }
        }
    });

    // 性能监控
    if (window.performance && window.performance.mark) {
        window.performance.mark('dashboard-init-complete');
        
        // 计算加载时间
        window.addEventListener('load', function() {
            setTimeout(() => {
                try {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
                    console.log(`🚀 AirRocket Dashboard 加载完成 (${loadTime}ms)`);
                } catch (e) {
                    console.log('🚀 AirRocket Dashboard 加载完成');
                }
            }, 1000);
        });
    }
});

// 用户下拉菜单功能
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
    
    // 关闭其他下拉菜单
    closeOtherDropdowns('userDropdown');
}

// 语言切换下拉菜单
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('show');
    
    // 关闭其他下拉菜单
    closeOtherDropdowns('languageDropdown');
}

// 关闭其他下拉菜单
function closeOtherDropdowns(except) {
    const dropdowns = ['userDropdown', 'languageDropdown'];
    dropdowns.forEach(id => {
        if (id !== except) {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        }
    });
}

// 主题切换功能
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('themeIcon');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // 切换主题
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新图标
    if (newTheme === 'light') {
        themeIcon.textContent = '☀️';
        themeToggle.classList.add('light');
        showNotification('🌞 已切换到浅色主题', 'info');
    } else {
        themeIcon.textContent = '🌙';
        themeToggle.classList.remove('light');
        showNotification('🌙 已切换到深色主题', 'info');
    }
}

// 语言切换功能
function changeLanguage(lang) {
    const languageMap = {
        'zh-CN': '中文',
        'en-US': 'English',
        'ja-JP': '日本語',
        'ko-KR': '한국어'
    };
    
    const currentLanguageElement = document.getElementById('currentLanguage');
    const languageDropdown = document.getElementById('languageDropdown');
    
    // 更新显示的语言
    currentLanguageElement.textContent = languageMap[lang] || '中文';
    
    // 保存到本地存储
    localStorage.setItem('language', lang);
    
    // 关闭下拉菜单
    languageDropdown.classList.remove('show');
    
    // 显示通知
    showNotification(`🌐 语言已切换到 ${languageMap[lang]}`, 'success');
    
    // 这里可以添加实际的语言切换逻辑
    // 例如：window.location.href = `/?lang=${lang}`;
}

// 初始化主题和语言
function initThemeAndLanguage() {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        themeToggle.classList.add('light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
        themeToggle.classList.remove('light');
    }
    
    // 初始化语言
    const savedLanguage = localStorage.getItem('language') || 'zh-CN';
    const languageMap = {
        'zh-CN': '中文',
        'en-US': 'English',
        'ja-JP': '日本語',
        'ko-KR': '한국어'
    };
    
    const currentLanguageElement = document.getElementById('currentLanguage');
    if (currentLanguageElement) {
        currentLanguageElement.textContent = languageMap[savedLanguage] || '中文';
    }
}

// 点击外部关闭下拉菜单
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const languageToggle = document.querySelector('.language-toggle');
    
    const userDropdown = document.getElementById('userDropdown');
    const languageDropdown = document.getElementById('languageDropdown');
    
    // 关闭用户下拉菜单
    if (userDropdown && userMenu && !userMenu.contains(event.target)) {
        userDropdown.classList.remove('show');
    }
    
    // 关闭语言下拉菜单
    if (languageDropdown && languageToggle && !languageToggle.contains(event.target)) {
        languageDropdown.classList.remove('show');
    }
}); 