// AirRocket 主题逻辑脚本

(function() {
    'use strict';
    
    // 主题初始化
    function initTheme() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTheme);
            return;
        }
        
        // 隐藏加载动画
        hideLoadingScreen();
        
        // 应用主题配置
        applyThemeConfig();
        
        // 初始化交互功能
        initInteractions();
        
        // 初始化响应式
        initResponsive();
        
        console.log('🚀 AirRocket Theme Initialized');
    }
    
    // 隐藏加载屏幕
    function hideLoadingScreen() {
        const loadingElement = document.querySelector('.airrocket-loading');
        if (loadingElement) {
            setTimeout(() => {
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }
    
    // 应用主题配置
    function applyThemeConfig() {
        const settings = window.settings;
        if (!settings || !settings.theme) return;
        
        const body = document.body;
        const theme = settings.theme;
        
        // 应用主题颜色
        if (theme.color && window.themeColors) {
            const color = window.themeColors[theme.color];
            if (color) {
                document.documentElement.style.setProperty('--primary-color', color);
                body.classList.add(`theme-${theme.color}`);
            }
        }
        
        // 应用侧边栏风格
        if (theme.sidebar_style) {
            body.classList.add(`sidebar-${theme.sidebar_style}`);
        }
        
        // 应用动画设置
        if (theme.enable_animations) {
            body.classList.add('animate-enabled');
        }
        
        // 应用卡片透明度
        if (theme.card_opacity) {
            body.classList.add(`opacity-${theme.card_opacity}`);
        }
        
        // 应用自定义背景
        if (settings.background_url) {
            body.style.backgroundImage = `linear-gradient(135deg, rgba(26, 32, 39, 0.9) 0%, rgba(15, 20, 25, 0.9) 100%), url(${settings.background_url})`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.backgroundAttachment = 'fixed';
        }
    }
    
    // 初始化交互功能
    function initInteractions() {
        // 添加卡片悬停效果
        addCardHoverEffects();
        
        // 添加按钮波纹效果
        addButtonRippleEffect();
        
        // 添加侧边栏交互
        initSidebarInteractions();
    }
    
    // 卡片悬停效果
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.ant-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // 按钮波纹效果
    function addButtonRippleEffect() {
        const buttons = document.querySelectorAll('.ant-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // 侧边栏交互
    function initSidebarInteractions() {
        // 移动端侧边栏切换
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.ant-layout-sider');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('mobile-open');
            });
        }
        
        // 添加菜单项点击效果
        const menuItems = document.querySelectorAll('.ant-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除其他项的选中状态
                menuItems.forEach(mi => mi.classList.remove('ant-menu-item-selected'));
                // 添加当前项的选中状态
                this.classList.add('ant-menu-item-selected');
            });
        });
    }
    
    // 响应式处理
    function initResponsive() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleTabletChange(e) {
            const body = document.body;
            if (e.matches) {
                body.classList.add('mobile-view');
            } else {
                body.classList.remove('mobile-view');
                // 桌面端时确保侧边栏是显示的
                const sidebar = document.querySelector('.ant-layout-sider');
                if (sidebar) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        }
        
        mediaQuery.addListener(handleTabletChange);
        handleTabletChange(mediaQuery);
    }
    
    // 主题切换功能
    window.switchThemeColor = function(color) {
        if (!window.themeColors || !window.themeColors[color]) return;
        
        const body = document.body;
        const newColor = window.themeColors[color];
        
        // 移除旧的主题类
        Object.keys(window.themeColors).forEach(c => {
            body.classList.remove(`theme-${c}`);
        });
        
        // 添加新的主题类
        body.classList.add(`theme-${color}`);
        
        // 更新 CSS 变量
        document.documentElement.style.setProperty('--primary-color', newColor);
        
        // 保存到设置
        if (window.settings && window.settings.theme) {
            window.settings.theme.color = color;
        }
    };
    
    // 动画切换
    window.toggleAnimations = function(enable) {
        const body = document.body;
        if (enable) {
            body.classList.add('animate-enabled');
        } else {
            body.classList.remove('animate-enabled');
        }
        
        if (window.settings && window.settings.theme) {
            window.settings.theme.enable_animations = enable;
        }
    };
    
    // 透明度切换
    window.setCardOpacity = function(level) {
        const body = document.body;
        // 移除旧的透明度类
        body.classList.remove('opacity-normal', 'opacity-high', 'opacity-low');
        // 添加新的透明度类
        body.classList.add(`opacity-${level}`);
        
        if (window.settings && window.settings.theme) {
            window.settings.theme.card_opacity = level;
        }
    };
    
    // 添加 CSS 样式
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .mobile-view .ant-layout-content {
                margin-left: 0;
                padding: 1rem;
            }
            
            .mobile-view .ant-layout-sider {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .mobile-view .ant-layout-sider.mobile-open {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // 初始化
    addDynamicStyles();
    initTheme();
    
})(); 