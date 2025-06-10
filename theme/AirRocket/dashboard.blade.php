<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title>{{$title}}</title>
    
    <!-- 引入主题样式 -->
    <link rel="stylesheet" href="/theme/{{$theme}}/assets/dashboard.css?v={{$version}}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
    
    <!-- 预加载关键资源 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Meta标签 -->
    <meta name="description" content="{{$description}}">
    <meta name="theme-color" content="#18CF96">
</head>
<body>
    <div class="dashboard-container">
        <!-- 侧边栏 -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <span class="logo-icon">🚀</span>
                    <span class="logo-text">AirRocket</span>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <div class="nav-section">
                    <a href="/user" class="nav-item active">
                        <span class="nav-icon">📊</span>
                        <span class="nav-text">控制面板</span>
                    </a>
                    <a href="/user/tutorial" class="nav-item">
                        <span class="nav-icon">🔗</span>
                        <span class="nav-text">使用教程</span>
                    </a>
                </div>
                
                <div class="nav-section">
                    <div class="nav-title">订阅</div>
                    <a href="/user/plan" class="nav-item">
                        <span class="nav-icon">📦</span>
                        <span class="nav-text">购买套餐</span>
                    </a>
                    <a href="/user/order" class="nav-item">
                        <span class="nav-icon">📝</span>
                        <span class="nav-text">订单详情</span>
                    </a>
                </div>
                
                <div class="nav-section">
                    <div class="nav-title">其他</div>
                    <a href="/user/order" class="nav-item">
                        <span class="nav-icon">📋</span>
                        <span class="nav-text">我的订单</span>
                    </a>
                    <a href="/user/invite" class="nav-item">
                        <span class="nav-icon">💰</span>
                        <span class="nav-text">我的邀请</span>
                    </a>
                    <a href="/user/knowledge" class="nav-item">
                        <span class="nav-icon">🛠️</span>
                        <span class="nav-text">服务工具</span>
                    </a>
                    <a href="/user/traffic" class="nav-item">
                        <span class="nav-icon">🔐</span>
                        <span class="nav-text">流量详情</span>
                    </a>
                    <a href="/user/subscribe" class="nav-item">
                        <span class="nav-icon">🔗</span>
                        <span class="nav-text">快捷订阅</span>
                    </a>
                </div>
                
                <div class="nav-section">
                    <a href="/user/profile" class="nav-item">
                        <span class="nav-icon">⚙️</span>
                        <span class="nav-text">个人设置</span>
                    </a>
                    <a href="/logout" class="nav-item" onclick="return confirm('确定要退出登录吗？')">
                        <span class="nav-icon">🚪</span>
                        <span class="nav-text">退出登录</span>
                    </a>
                </div>
            </nav>
            
            <!-- 底部用户信息 -->
            <div class="sidebar-footer">
                <div class="user-info">
                    <div class="user-avatar">{{ strtoupper(substr($user['email'] ?? 'U', 0, 1)) }}</div>
                    <div class="user-details">
                        <div class="user-name">{{ explode('@', $user['email'] ?? 'User')[0] }}</div>
                        <div class="user-email">{{ $user['email'] ?? 'user@example.com' }}</div>
                    </div>
                </div>
            </div>
        </aside>
        
        <!-- 主要内容区域 -->
        <main class="main-content">
            <!-- 顶部栏 -->
            <header class="top-bar">
                <div class="top-bar-left">
                    <h1 class="page-title">控制面板</h1>
                </div>
                <div class="top-bar-right">
                    <!-- 主题切换 -->
                    <div class="theme-toggle" onclick="toggleTheme()">
                        <span class="theme-icon" id="themeIcon">🌙</span>
                    </div>
                    
                    <!-- 语言切换 -->
                    <div class="language-toggle" onclick="toggleLanguageDropdown()">
                        <span class="language-icon">🌐</span>
                        <span class="language-text" id="currentLanguage">中文</span>
                        <div class="language-dropdown" id="languageDropdown">
                            <a href="javascript:void(0)" class="language-item" onclick="changeLanguage('zh-CN')">
                                <span class="lang-flag">🇨🇳</span>
                                <span class="lang-name">简体中文</span>
                            </a>
                            <a href="javascript:void(0)" class="language-item" onclick="changeLanguage('en-US')">
                                <span class="lang-flag">🇺🇸</span>
                                <span class="lang-name">English</span>
                            </a>
                            <a href="javascript:void(0)" class="language-item" onclick="changeLanguage('ja-JP')">
                                <span class="lang-flag">🇯🇵</span>
                                <span class="lang-name">日本語</span>
                            </a>
                            <a href="javascript:void(0)" class="language-item" onclick="changeLanguage('ko-KR')">
                                <span class="lang-flag">🇰🇷</span>
                                <span class="lang-name">한국어</span>
                            </a>
                        </div>
                    </div>
                    
                    <a href="/user/order" class="btn btn-primary">立即充值</a>
                    <a href="/user/plan" class="btn btn-secondary">购买套餐</a>
                    <div class="user-menu" onclick="toggleUserDropdown()">
                        <span class="user-icon">👤</span>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="/user/profile" class="dropdown-item">
                                <span class="dropdown-icon">⚙️</span>
                                个人设置
                            </a>
                            <a href="/user/invite" class="dropdown-item">
                                <span class="dropdown-icon">💰</span>
                                我的邀请
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="/logout" class="dropdown-item" onclick="return confirm('确定要退出登录吗？')">
                                <span class="dropdown-icon">🚪</span>
                                退出登录
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- 仪表板内容 -->
            <div class="dashboard-grid">
                <!-- 左侧主要内容 -->
                <div class="main-section">
                    <!-- 欢迎卡片 -->
                    <div class="welcome-card">
                        <div class="welcome-content">
                            <div class="welcome-header">
                                <div class="user-greeting">
                                    <div class="greeting-avatar">👨‍💻</div>
                                    <div class="greeting-text">
                                        <h2>Halo, {{ $user['email'] ?? 'User' }}</h2>
                                        <p class="subscription-info">我的订阅</p>
                                        <h3 class="plan-name">{{ $user['plan']['name'] ?? '未订阅套餐' }}</h3>
                                        <div class="plan-details">
                                            <div class="plan-item">
                                                <span class="plan-label">到期时间：</span>
                                                <span class="plan-value">{{ $user['expired_at'] ? date('Y-m-d', $user['expired_at']) : '未设置' }}</span>
                                            </div>
                                            <div class="plan-item">
                                                <span class="plan-label">总流量限制：</span>
                                                <span class="plan-value">{{ $user['transfer_enable'] ? formatBytes($user['transfer_enable']) : '无限制' }}</span>
                                            </div>
                                            <div class="plan-item">
                                                <span class="plan-label">剩余可用流量：</span>
                                                <span class="plan-value">{{ formatBytes(($user['transfer_enable'] ?? 0) - ($user['u'] ?? 0) - ($user['d'] ?? 0)) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 余额卡片 -->
                        <div class="balance-card">
                            <div class="balance-header">
                                <span class="balance-label">账户余额</span>
                                <span class="balance-amount">¥{{ number_format(($user['balance'] ?? 0) / 100, 2) }}</span>
                            </div>
                            <div class="balance-details">
                                <div class="balance-item">
                                    <span class="balance-sublabel">累计充值</span>
                                    <span class="balance-subvalue">¥{{ number_format(($stat['total_deposit'] ?? 0) / 100, 2) }}</span>
                                </div>
                                <div class="balance-item">
                                    <span class="balance-sublabel">累计消费</span>
                                    <span class="balance-subvalue">¥{{ number_format(($stat['total_commission'] ?? 0) / 100, 2) }}</span>
                                </div>
                                <div class="balance-total">
                                    <span class="total-amount">¥{{ number_format((($stat['total_deposit'] ?? 0) - ($stat['total_commission'] ?? 0)) / 100, 2) }}</span>
                                </div>
                                <button class="btn btn-primary btn-recharge" onclick="window.location.href='/user/order'">充值</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 客户端下载 -->
                    <div class="clients-section">
                        <h3 class="section-title">客户端下载</h3>
                        <div class="clients-grid">
                            <div class="client-card windows" data-download-url="{{ $theme_config['windows_download_url'] ?? '' }}">
                                <div class="client-icon">🪟</div>
                                <div class="client-name">Windows 客户端</div>
                                @if(!empty($theme_config['windows_download_url']))
                                    <div class="download-status available">✅ 可下载</div>
                                @else
                                    <div class="download-status unavailable">⚠️ 暂未配置</div>
                                @endif
                            </div>
                            <div class="client-card ios" data-download-url="{{ $theme_config['ios_download_url'] ?? '' }}">
                                <div class="client-icon">🍎</div>
                                <div class="client-name">iOS 客户端</div>
                                @if(!empty($theme_config['ios_download_url']))
                                    <div class="download-status available">✅ 可下载</div>
                                @else
                                    <div class="download-status unavailable">⚠️ 暂未配置</div>
                                @endif
                            </div>
                            <div class="client-card android" data-download-url="{{ $theme_config['android_download_url'] ?? '' }}">
                                <div class="client-icon">🤖</div>
                                <div class="client-name">Android 客户端</div>
                                @if(!empty($theme_config['android_download_url']))
                                    <div class="download-status available">✅ 可下载</div>
                                @else
                                    <div class="download-status unavailable">⚠️ 暂未配置</div>
                                @endif
                            </div>
                            <div class="client-card macos" data-download-url="{{ $theme_config['macos_download_url'] ?? '' }}">
                                <div class="client-icon">💻</div>
                                <div class="client-name">MacOS 客户端</div>
                                @if(!empty($theme_config['macos_download_url']))
                                    <div class="download-status available">✅ 可下载</div>
                                @else
                                    <div class="download-status unavailable">⚠️ 暂未配置</div>
                                @endif
                            </div>
                        </div>
                    </div>
                    
                    <!-- 订阅链接 -->
                    <div class="subscription-section">
                        <h3 class="section-title">订阅链接</h3>
                        <div class="subscription-input">
                            <input type="text" value="{{ $subscribe_url ?? '暂无订阅链接' }}" readonly>
                            <button class="btn-copy">📋</button>
                        </div>
                        
                        <div class="subscription-tools">
                            <span class="tool-label">快速添加至第三方客户端</span>
                            <div class="tool-buttons">
                                <button class="tool-btn">📱</button>
                                <button class="tool-btn">📊</button>
                                <button class="tool-btn">⚡</button>
                                <button class="tool-btn">➡️</button>
                                <button class="tool-btn">📈</button>
                                <button class="tool-btn">❓</button>
                            </div>
                        </div>
                        
                        <!-- 二维码 -->
                        <div class="qr-section">
                            <div class="qr-code">
                                <div class="qr-placeholder">QR Code</div>
                            </div>
                            <div class="qr-info">
                                <p>Shadowrocket / Clash 客户端</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 邀请推荐 -->
                    <div class="invite-section">
                        <div class="invite-card">
                            <div class="invite-content">
                                <div class="invite-text">
                                    <h3>邀请好友</h3>
                                    <h2>赚取丰厚佣金</h2>
                                    <div class="invite-percentage">10%</div>
                                    <p class="invite-desc">立即邀请朋友注册使用，可获取您朋友的消费</p>
                                    <button class="btn btn-invite">立即邀请</button>
                                </div>
                                <div class="invite-illustration">
                                    <div class="robot-icon">🤖</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 右侧通知区域 -->
                <div class="sidebar-section">
                    <div class="notifications">
                        <div class="notification-header">
                            <h3>重要通知</h3>
                            <span class="notification-icon">🔔</span>
                        </div>
                        
                        <div class="notification-card promo">
                            <div class="promo-content">
                                <h3>超级科学</h3>
                                <div class="promo-discount">-1072~25~14</div>
                                <div class="promo-rate">7.8折</div>
                                <p>EveryOne 收下这份礼物吧!</p>
                                <button class="btn btn-promo">立即领取 ></button>
                            </div>
                        </div>
                        
                        <div class="ios-notification">
                            <div class="ios-icon">📱</div>
                            <div class="ios-text">
                                <h4>iOS 须知</h4>
                                <p>由于苹果AppStore政策限制，大量不了...</p>
                            </div>
                        </div>
                        
                        <div class="calendar-widget">
                            <div class="calendar-header">
                                <span class="calendar-number">24</span>
                            </div>
                            <div class="calendar-date">
                                <span class="year">20<span class="highlight">25</span></span>
                            </div>
                            <div class="calendar-footer">
                                <p>财金诊疗广顾轻松</p>
                                <small>奉作风、我的印象、创新、标牌、美念、大美、翘翘</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- 全局配置脚本 -->
    <script>
        window.routerBase = "/";
    </script>
    
    <?php
        $settingsData = [
            'title' => $title,
            'assets_path' => '/theme/'.$theme.'/assets',
            'theme' => [
                'name' => 'AirRocket',
                'color' => $theme_config['theme_color'] ?? 'teal',
                'sidebar_style' => $theme_config['sidebar_style'] ?? 'dark',
                'enable_animations' => ($theme_config['enable_animations'] ?? 'true') === 'true',
                'card_opacity' => $theme_config['card_opacity'] ?? 'normal',
                'show_charts' => ($theme_config['show_charts'] ?? 'true') === 'true'
            ],
            'version' => $version,
            'background_url' => $theme_config['background_url'] ?? '',
            'description' => $description,
            'logo' => $logo,
            'i18n' => [
                'zh-CN',
                'en-US', 
                'ja-JP',
                'vi-VN',
                'ko-KR',
                'zh-TW',
                'fa-IR'
            ]
        ];
    ?>
    <script>
        window.settings = <?= json_encode($settingsData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
        
        // 主题颜色配置
        window.themeColors = {
            teal: "#18CF96",
            blue: "#3B82F6", 
            purple: "#8B5CF6",
            green: "#10B981",
            orange: "#F59E0B"
        };
    </script>

    <!-- 主题自定义脚本 -->
    <script src="/theme/{{$theme}}/assets/dashboard.js?v={{$version}}"></script>
    
    <!-- 自定义HTML内容 -->
    {!! $theme_config['custom_html'] ?? '' !!}
</body>
</html> 