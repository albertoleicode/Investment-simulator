// 小财神投资理财学院 - 交互逻辑

// ==================== 版本管理和数据迁移 ====================
const APP_VERSION = '1.1.0';

// 版本检查和数据迁移
function checkDataVersion() {
    const storedVersion = localStorage.getItem('appVersion');
    
    if (storedVersion !== APP_VERSION) {
        console.log(`检测到版本变更: ${storedVersion} -> ${APP_VERSION}`);
        migrateUserData(storedVersion, APP_VERSION);
        localStorage.setItem('appVersion', APP_VERSION);
    }
}

// 数据迁移处理
function migrateUserData(oldVersion, newVersion) {
    console.log(`执行数据迁移: ${oldVersion || '无'} -> ${newVersion}`);
    
    // 根据版本号执行不同的迁移逻辑
    if (!oldVersion) {
        // 首次安装，初始化数据
        initializeUserData();
    } else if (oldVersion === '1.0.0' && newVersion === '1.1.0') {
        // 从1.0.0升级到1.1.0的特定迁移
        migrateFromV1ToV1_1();
    }
    
    // 记录迁移历史（可选）
    const migrationHistory = JSON.parse(localStorage.getItem('migrationHistory') || '[]');
    migrationHistory.push({
        from: oldVersion,
        to: newVersion,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('migrationHistory', JSON.stringify(migrationHistory));
}

// 初始化用户数据
function initializeUserData() {
    console.log('初始化用户数据');
    // 确保学习进度数据结构正确
    if (!localStorage.getItem('learningProgress')) {
        localStorage.setItem('learningProgress', JSON.stringify({
            completedConcepts: [],
            quizScores: [],
            totalStudyTime: 0
        }));
    }
}

// 从1.0.0到1.1.0的特定迁移
function migrateFromV1ToV1_1() {
    console.log('执行v1.0.0到v1.1.0迁移');
    
    // 迁移实战训练历史数据格式
    const oldHistory = localStorage.getItem('simulationHistory');
    if (oldHistory) {
        try {
            const historyData = JSON.parse(oldHistory);
            // 在这里处理数据格式变化
            localStorage.setItem('simulationHistory_v1_1', JSON.stringify(historyData));
        } catch (e) {
            console.error('迁移历史数据失败:', e);
        }
    }
}

// ==================== 版本管理和数据迁移 ====================
const APP_VERSION = '1.1.0';

// 版本检查和数据迁移
function checkDataVersion() {
    const storedVersion = localStorage.getItem('appVersion');
    
    if (storedVersion !== APP_VERSION) {
        console.log(`检测到版本变更: ${storedVersion} -> ${APP_VERSION}`);
        migrateUserData(storedVersion, APP_VERSION);
        localStorage.setItem('appVersion', APP_VERSION);
        
        // 显示版本更新提示
        showVersionUpdateMessage(storedVersion, APP_VERSION);
    } else {
        // 检查是否有新功能提示
        checkNewFeatures();
    }
}

// 新增：显示版本更新提示
function showVersionUpdateMessage(oldVersion, newVersion) {
    // 延迟显示，确保页面加载完成
    setTimeout(() => {
        const newFeatures = getNewFeaturesByVersion(newVersion);
        
        const updateHTML = `
            <div id="updateNotification" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4a6491, #2c3e50);
                color: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 350px;
                border-left: 5px solid #28a745;
                animation: slideIn 0.5s ease-out;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 1.5em; margin-right: 10px;">🎉</span>
                    <h3 style="margin: 0; color: white;">版本更新提醒</h3>
                    <button onclick="closeUpdateNotification()" style="
                        margin-left: auto; 
                        background: none; 
                        border: none; 
                        color: white; 
                        font-size: 1.2em; 
                        cursor: pointer;
                    ">×</button>
                </div>
                <p style="margin: 10px 0; line-height: 1.4;">小财神理财已升级到 <strong>v${newVersion}</strong></p>
                <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
                    <strong>新功能：</strong>
                    <ul style="margin: 8px 0; padding-left: 20px;">
                        ${newFeatures.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="closeUpdateNotification()" style="
                    width: 100%; 
                    background: rgba(255,255,255,0.2); 
                    color: white; 
                    border: 1px solid rgba(255,255,255,0.3); 
                    padding: 8px; 
                    border-radius: 5px; 
                    cursor: pointer;
                    margin-top: 10px;
                ">开始体验新功能</button>
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', updateHTML);
        
        // 5秒后自动关闭
        setTimeout(() => {
            const notification = document.getElementById('updateNotification');
            if (notification) {
                notification.style.animation = 'slideIn 0.5s ease-out reverse';
                setTimeout(() => notification.remove(), 500);
            }
        }, 8000);
        
    }, 1000);
}

// 新增：关闭更新提示
function closeUpdateNotification() {
    const notification = document.getElementById('updateNotification');
    if (notification) {
        notification.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }
}

// 新增：根据版本获取新功能描述
function getNewFeaturesByVersion(version) {
    const features = {
        '1.1.0': [
            '🤖 AI投资优化建议',
            '📈 模拟历史记录',
            '🔄 经济周期学习',
            '💾 自动数据迁移'
        ],
        '1.0.0': [
            '📚 理财知识学习',
            '💹 投资模拟训练',
            '⚡ 风险评估系统'
        ]
    };
    
    return features[version] || ['性能优化和问题修复'];
}

// 新增：检查新功能提示（即使版本未变）
function checkNewFeatures() {
    const lastVisit = localStorage.getItem('lastVisitVersion');
    const currentTime = new Date().getTime();
    
    // 如果7天内没访问过，或者上次访问是旧版本，显示新功能提示
    if (!lastVisit || (currentTime - parseInt(lastVisit) > 7 * 24 * 60 * 60 * 1000)) {
        setTimeout(() => {
            if (confirm('🎉 欢迎回到小财神理财！是否查看最新功能？')) {
                showNewFeaturesTour();
            }
        }, 2000);
    }
    
    localStorage.setItem('lastVisitVersion', currentTime.toString());
}

// 新增：新功能引导
function showNewFeaturesTour() {
    const features = getNewFeaturesByVersion(APP_VERSION);
    
    const tourHTML = `
        <div id="newFeaturesTour" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size: 3em;">🎯</span>
                <h2 style="color: #4a6491; margin: 10px 0;">发现新功能</h2>
                <p>版本 ${APP_VERSION} 为您带来更好的体验</p>
            </div>
            
            <div style="margin: 20px 0;">
                ${features.map((feature, index) => `
                    <div style="display: flex; align-items: center; padding: 10px; background: #f8f9fa; margin: 10px 0; border-radius: 10px;">
                        <span style="font-size: 1.5em; margin-right: 15px;">${feature.split(' ')[0]}</span>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="closeNewFeaturesTour()" style="
                width: 100%; 
                background: #4a6491; 
                color: white; 
                border: none; 
                padding: 12px; 
                border-radius: 10px; 
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">开始探索</button>
        </div>
        <div id="tourOverlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        "></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', tourHTML);
}

// 新增：关闭新功能引导
function closeNewFeaturesTour() {
    const tour = document.getElementById('newFeaturesTour');
    const overlay = document.getElementById('tourOverlay');
    if (tour) tour.remove();
    if (overlay) overlay.remove();
}

// 应用启动时立即检查版本
checkDataVersion();

// 学习进度数据
let learningProgress = {
    completedConcepts: [],
    quizScores: [],
    totalStudyTime: 0
};

// 实战训练模块 - 添加风险承受能力评估
class PracticalTraining {
    constructor() {
        this.availableYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
        this.currentYear = null;
        this.userMaxDrawdown = 15; // 默认15%
        this.riskProfile = ''; // 风险画像
        this.simulationHistory = []; // 记录模拟历史
    }



    showPracticalTraining() {
        document.querySelector('.container').innerHTML = `
            <h2>🎯 实战训练营</h2>
            <div class="concept-card">
                <h3>历史回测模拟 - 真实ETF投资</h3>
                <p>基于真实ETF历史数据进行投资实战训练！</p>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>📊 投资标的说明</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 10px 0;">
                        <div style="text-align: center; background: #e8f5e8; padding: 10px; border-radius: 5px;">
                            <strong>📈 159919</strong><br>
                            <small>沪深300ETF</small>
                        </div>
                        <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 5px;">
                            <strong>📄 511010</strong><br>
                            <small>国债ETF</small>
                        </div>
                        <div style="text-align: center; background: #ffebee; padding: 10px; border-radius: 5px;">
                            <strong>🟡 518880</strong><br>
                            <small>黄金ETF</small>
                        </div>
                    </div>
                </div>

                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>📅 选择训练年份</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 15px 0;">
                        ${this.availableYears.map(year => `
                            <button onclick="practicalTraining.selectYear(${year})" 
                                    style="padding: 10px; background: #4a6491; color: white; border: none; border-radius: 5px;">
                                ${year}年
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')" style="width: auto;">📚 返回主页</button>
            </div>
        `;
    }
 // 选择年份并加载真实数据
    async selectYear(year) {
        this.currentYear = year;
        
        // 显示加载状态
        document.querySelector('.container').innerHTML = `
            <h2>📊 加载 ${year} 年真实数据...</h2>
            <div class="concept-card" style="text-align: center;">
                <div style="font-size: 3em; margin: 20px 0;">⏳</div>
                <p>正在获取 ${year} 年的真实经济数据...</p>
                <p>包括GDP、CPI、ETF表现等真实历史数据</p>
            </div>
        `;

        try {
            // 模拟数据加载过程
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 获取真实历史数据
            const yearData = this.getHistoricalETFData(year);
            this.showEconomicAnalysis(yearData);
            
        } catch (error) {
            alert('数据加载失败，请重试');
            this.showPracticalTraining();
        }
    }


    // 获取真实历史ETF数据
    getHistoricalETFData(year) {
        // 基于真实历史数据的模拟
        const historicalData = {
            2014: {
                year: 2014,
                gdp: '7.3%',
                cpi: '2.0%',
                ppi: '-1.9%',
                pmi: 50.1,
                depositRate: '2.75%',
                // 真实ETF历史表现
                hs300Return: '51.7%',    // 沪深300ETF 159919 当年表现
                bondReturn: '4.2%',      // 国债ETF 511010 当年表现
                goldReturn: '-1.5%',     // 黄金ETF 518880 当年表现
                events: "沪港通开通，A股市场国际化迈出重要一步，股市大幅上涨",
                economicCycle: '复苏期'
            },
            2015: {
                year: 2015,
                gdp: '6.9%',
                cpi: '1.4%',
                ppi: '-5.2%',
                pmi: 49.7,
                depositRate: '1.50%',
                hs300Return: '5.6%',
                bondReturn: '3.8%',
                goldReturn: '-6.5%',
                events: "A股市场经历大幅波动，从牛市快速转向深度调整",
                economicCycle: '衰退期'
            },
            2016: {
                year: 2016,
                gdp: '6.7%',
                cpi: '2.0%',
                ppi: '-1.4%',
                pmi: 51.4,
                depositRate: '1.50%',
                hs300Return: '-11.3%',
                bondReturn: '2.1%',
                goldReturn: '18.5%',
                events: "供给侧改革深化，房地产去库存政策实施，黄金表现突出",
                economicCycle: '滞胀期'
            },
            2017: {
                year: 2017,
                gdp: '6.8%',
                cpi: '1.6%',
                ppi: '6.3%',
                pmi: 51.6,
                depositRate: '1.50%',
                hs300Return: '21.8%',
                bondReturn: '1.2%',
                goldReturn: '6.5%',
                events: "金融去杠杆，M2增速放缓，价值股表现优异",
                economicCycle: '复苏期'
            },
            2018: {
                year: 2018,
                gdp: '6.6%',
                cpi: '2.1%',
                ppi: '3.5%',
                pmi: 49.4,
                depositRate: '1.50%',
                hs300Return: '-25.3%',
                bondReturn: '8.1%',
                goldReturn: '3.6%',
                events: "中美贸易摩擦，外部环境复杂化，股市大幅调整",
                economicCycle: '衰退期'
            },
            2019: {
                year: 2019,
                gdp: '6.1%',
                cpi: '2.9%',
                ppi: '-0.3%',
                pmi: 50.2,
                depositRate: '1.50%',
                hs300Return: '36.1%',
                bondReturn: '3.2%',
                goldReturn: '18.9%',
                events: "科创板设立，注册制试点落地，科技股领涨",
                economicCycle: '复苏期'
            },
            2020: {
                year: 2020,
                gdp: '2.3%',
                cpi: '2.5%',
                ppi: '-1.8%',
                pmi: 51.9,
                depositRate: '1.50%',
                hs300Return: '27.2%',
                bondReturn: '2.6%',
                goldReturn: '14.5%',
                events: "新冠疫情爆发，全球经济受到冲击，医药和科技股表现突出",
                economicCycle: '复苏期'
            },
            2021: {
                year: 2021,
                gdp: '8.1%',
                cpi: '0.9%',
                ppi: '8.1%',
                pmi: 50.3,
                depositRate: '1.50%',
                hs300Return: '-5.2%',
                bondReturn: '4.8%',
                goldReturn: '-4.2%',
                events: "双碳目标提出，新能源产业快速发展，市场风格分化",
                economicCycle: '滞胀期'
            },
            2022: {
                year: 2022,
                gdp: '3.0%',
                cpi: '2.0%',
                ppi: '4.1%',
                pmi: 47.0,
                depositRate: '1.50%',
                hs300Return: '-21.6%',
                bondReturn: '2.3%',
                goldReturn: '9.8%',
                events: "美联储激进加息，全球流动性收紧，权益资产承压",
                economicCycle: '衰退期'
            },
            2023: {
                year: 2023,
                gdp: '5.2%',
                cpi: '0.2%',
                ppi: '-3.0%',
                pmi: 49.0,
                depositRate: '1.50%',
                hs300Return: '-11.4%',
                bondReturn: '3.1%',
                goldReturn: '16.8%',
                events: "经济复苏曲折，消费逐步恢复，黄金避险属性凸显",
                economicCycle: '衰退期'
            },
            2024: {
                year: 2024,
                gdp: '5.0%',
                cpi: '0.8%',
                ppi: '-2.5%',
                pmi: 50.8,
                depositRate: '1.50%',
                hs300Return: '8.5%',
                bondReturn: '2.8%',
                goldReturn: '12.2%',
                events: "人工智能技术突破，数字经济加速发展，结构性行情明显",
                economicCycle: '复苏期'
            }
        };

        return historicalData[year] || this.generateFallbackData(year);
    }

    // 生成备用数据（如果某年数据缺失）
    generateFallbackData(year) {
        return {
            year: year,
            gdp: '6.0%',
            cpi: '2.0%',
            ppi: '1.0%',
            pmi: 50.0,
            depositRate: '1.50%',
            hs300Return: '10.0%',
            bondReturn: '3.0%',
            goldReturn: '5.0%',
            events: "经济平稳运行，市场正常波动",
            economicCycle: '复苏期'
        };
    }

    // 显示经济数据分析
    showEconomicAnalysis(data) {
        document.querySelector('.container').innerHTML = `
            <h2>📊 ${data.year} 年经济分析</h2>
            <div class="concept-card">
                <!-- 宏观经济数据 -->
                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>📈 宏观经济数据</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                        <div><strong>GDP增长率:</strong> ${data.gdp}</div>
                        <div><strong>CPI通胀率:</strong> ${data.cpi}</div>
                        <div><strong>PPI工业价格:</strong> ${data.ppi}</div>
                        <div><strong>PMI景气指数:</strong> ${data.pmi}</div>
                        <div><strong>存款利率:</strong> ${data.depositRate}</div>
                    </div>
                </div>

                <!-- ETF真实表现 -->
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>📊 ETF真实历史表现</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 10px 0;">
                        <div style="text-align: center; background: #e8f5e8; padding: 10px; border-radius: 5px;">
                            <strong>159919</strong><br>
                            沪深300ETF<br>
                            <span style="color: ${parseFloat(data.hs300Return) >= 0 ? '#28a745' : '#dc3545'}; font-weight: bold;">
                                ${data.hs300Return}
                            </span>
                        </div>
                        <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 5px;">
                            <strong>511010</strong><br>
                            国债ETF<br>
                            <span style="color: #28a745; font-weight: bold;">${data.bondReturn}</span>
                        </div>
                        <div style="text-align: center; background: #ffebee; padding: 10px; border-radius: 5px;">
                            <strong>518880</strong><br>
                            黄金ETF<br>
                            <span style="color: ${parseFloat(data.goldReturn) >= 0 ? '#28a745' : '#dc3545'}; font-weight: bold;">
                                ${data.goldReturn}
                            </span>
                        </div>
                    </div>
                    <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                        * 基于真实历史数据，反映当年实际涨跌幅
                    </p>
                </div>

                <!-- 经济周期判断 -->
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>🤔 经济周期判断</h4>
                    <p>根据以上真实数据，你认为 ${data.year} 年处于什么经济周期？</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
                        <button onclick="practicalTraining.checkCycleJudgment('衰退期', '${data.economicCycle}')" 
                                style="background: #ffebee; padding: 12px; border: none; border-radius: 8px;">
                            📉 衰退期
                        </button>
                        <button onclick="practicalTraining.checkCycleJudgment('复苏期', '${data.economicCycle}')" 
                                style="background: #e8f5e8; padding: 12px; border: none; border-radius: 8px;">
                            📈 复苏期
                        </button>
                        <button onclick="practicalTraining.checkCycleJudgment('通胀期', '${data.economicCycle}')" 
                                style="background: #fff3cd; padding: 12px; border: none; border-radius: 8px;">
                            💰 通胀期
                        </button>
                        <button onclick="practicalTraining.checkCycleJudgment('滞胀期', '${data.economicCycle}')" 
                                style="background: #f3e5f5; padding: 12px; border: none; border-radius: 8px;">
                            ⚡ 滞胀期
                        </button>
                    </div>
                </div>

                <!-- 当年重要事件 -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>📰 当年重要事件</h4>
                    <p>${data.events}</p>
                </div>

                <!-- 隐藏数据用于后续使用 -->
                <input type="hidden" id="economicData" value='${JSON.stringify(data)}'>

                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="practicalTraining.showPracticalTraining()" style="background: #6c757d;">🔄 选择其他年份</button>
                    <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')" style="background: #4a6491;">📚 返回主页</button>
                </div>
            </div>
        `;
    }

    // 检查周期判断
    checkCycleJudgment(userJudgment, correctCycle) {
        const isCorrect = userJudgment === correctCycle;
        
        if (isCorrect) {
            alert(`✅ 判断正确！\n\n${this.currentYear}年确实处于${correctCycle}\n\n点击确定继续风险承受能力评估`);
            this.showRiskToleranceSelection();
        } else {
            alert(`❌ 判断错误！\n\n${this.currentYear}年实际处于${correctCycle}\n\n💡 学习建议：${this.getCycleJudgmentAdvice(correctCycle)}`);
            this.showRiskToleranceSelection();
        }
    }

    // 获取周期判断建议
    getCycleJudgmentAdvice(correctCycle) {
        const advice = {
            '衰退期': '注意GDP增长放缓、PMI低于50、企业盈利下滑等特征',
            '复苏期': '关注PMI回升、企业盈利改善、政策支持等信号',
            '通胀期': '观察CPI上升、PPI大幅上涨、可能加息等迹象',
            '滞胀期': '识别高通胀与经济停滞同时出现的特殊环境'
        };
        return advice[correctCycle] || '多观察经济指标的变化趋势';
    }

     // 显示风险承受能力评估
    showRiskToleranceSelection() {
        document.querySelector('.container').innerHTML = `
            <h2>🎯 风险承受能力评估</h2>
            <div class="concept-card">
                <h3>了解你的风险偏好</h3>
                <p>选择你能接受的最大季度亏损幅度，这反映了你的风险承受能力</p>
                
                <!-- 风险说明 -->
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>📊 什么是最大回撤？</h4>
                    <p><strong>最大回撤</strong>是指投资组合从高点下跌的最大幅度。</p>
                    <p>例如：如果你的投资从10000元跌到8500元，最大回撤就是15%。</p>
                </div>

                <!-- 风险承受选择 -->
                <div style="margin: 25px 0;">
                    <label><strong>我能接受的最大季度亏损：</strong></label>
                    <div style="margin: 20px 0;">
                        <input type="range" id="drawdownSlider" min="5" max="30" value="${this.userMaxDrawdown}" 
                               oninput="practicalTraining.updateDrawdownValue(this.value)" 
                               style="width: 100%; height: 10px; margin: 15px 0;">
                        <div style="text-align: center; margin: 15px 0;">
                            <span id="drawdownValue" style="font-size: 1.5em; color: #dc3545; font-weight: bold;">
                                ${this.userMaxDrawdown}%
                            </span>
                        </div>
                    </div>
                    
                    <!-- 风险等级说明 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 20px 0;">
                        <div style="text-align: center; background: #d4edda; padding: 12px; border-radius: 8px;">
                            <strong>保守型</strong><br>
                            <small>接受5-10%亏损</small><br>
                            <span style="font-size: 0.8em; color: #155724;">适合风险厌恶者</span>
                        </div>
                        <div style="text-align: center; background: #fff3cd; padding: 12px; border-radius: 8px;">
                            <strong>平衡型</strong><br>
                            <small>接受10-20%亏损</small><br>
                            <span style="font-size: 0.8em; color: #856404;">适合大多数投资者</span>
                        </div>
                        <div style="text-align: center; background: #f8d7da; padding: 12px; border-radius: 8px;">
                            <strong>进取型</strong><br>
                            <small>接受20-30%亏损</small><br>
                            <span style="font-size: 0.8em; color: #721c24;">适合风险偏好者</span>
                        </div>
                    </div>
                </div>

                <!-- 风险测试题目 -->
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>🧠 风险偏好测试</h4>
                    <p><strong>如果投资亏损达到你设定的 ${this.userMaxDrawdown}%，你会：</strong></p>
                    <div style="margin: 15px 0;">
                        <div style="margin: 10px 0;">
                            <input type="radio" id="reaction1" name="reaction" value="panic" 
                                   onchange="practicalTraining.updateRiskProfile('panic')">
                            <label for="reaction1" style="margin-left: 8px;">立即赎回所有投资，不再冒险</label>
                        </div>
                        <div style="margin: 10px 0;">
                            <input type="radio" id="reaction2" name="reaction" value="hold" 
                                   onchange="practicalTraining.updateRiskProfile('hold')">
                            <label for="reaction2" style="margin-left: 8px;">保持持有，相信会涨回来</label>
                        </div>
                        <div style="margin: 10px 0;">
                            <input type="radio" id="reaction3" name="reaction" value="buy" 
                                   onchange="practicalTraining.updateRiskProfile('buy')">
                            <label for="reaction3" style="margin-left: 8px;">追加投资，认为这是买入机会</label>
                        </div>
                    </div>
                </div>

                <!-- 投资经验 -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>📈 投资经验评估</h4>
                    <p><strong>你的投资经验：</strong></p>
                    <select id="experienceLevel" onchange="practicalTraining.updateExperienceLevel(this.value)" 
                            style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                        <option value="beginner">新手：刚开始学习投资</option>
                        <option value="intermediate">有一定经验：投资过基金/股票</option>
                        <option value="experienced">经验丰富：有多年投资经验</option>
                    </select>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="practicalTraining.showRiskAssessmentResult()" 
                            style="background: #28a745; padding: 12px 20px;">
                        📊 查看风险评估结果
                    </button>
                    <button onclick="practicalTraining.showEconomicAnalysis(JSON.parse(document.getElementById('economicData').value))" 
                            style="background: #6c757d; padding: 12px 20px;">
                        ← 返回经济分析
                    </button>
                </div>
            </div>
        `;
    }

    // 更新回撤值显示
    updateDrawdownValue(value) {
        this.userMaxDrawdown = parseInt(value);
        document.getElementById('drawdownValue').textContent = value + '%';
        
        // 更新风险测试题目的描述
        const testQuestion = document.querySelector('#drawdownSlider').parentNode.querySelector('p');
        if (testQuestion) {
            testQuestion.innerHTML = `<strong>如果投资亏损达到你设定的 ${value}%，你会：</strong>`;
        }
    }

    // 更新风险画像
    updateRiskProfile(reaction) {
        this.riskReaction = reaction;
    }

    // 更新经验等级
    updateExperienceLevel(level) {
        this.experienceLevel = level;
    }

    // 显示风险评估结果
    showRiskAssessmentResult() {
        // 确定风险等级
        let riskLevel, riskDescription, riskColor, recommendation;
        
        if (this.userMaxDrawdown <= 10) {
            riskLevel = "保守型";
            riskDescription = "你倾向于规避风险，注重资金安全";
            riskColor = "#d4edda";
            recommendation = "建议配置更多存款和债券，少量参与股票投资";
        } else if (this.userMaxDrawdown <= 20) {
            riskLevel = "平衡型";
            riskDescription = "你能接受适度风险，追求平衡收益";
            riskColor = "#fff3cd";
            recommendation = "适合均衡配置，股票、债券、黄金合理分配";
        } else {
            riskLevel = "进取型";
            riskDescription = "你能承受较大波动，追求更高收益";
            riskColor = "#f8d7da";
            recommendation = "可以配置较多股票资产，但要控制总体风险";
        }

        // 根据行为反应调整建议
        let behaviorAdvice = "";
        if (this.riskReaction === 'panic') {
            behaviorAdvice = "⚠️ 注意：你在亏损时容易恐慌性赎回，建议从较小金额开始投资，逐步建立信心。";
        } else if (this.riskReaction === 'buy') {
            behaviorAdvice = "💡 你在市场下跌时保持理性，这种逆向思维是成功投资的重要素质。";
        }

        document.querySelector('.container').innerHTML = `
            <h2>📊 风险评估结果</h2>
            <div class="concept-card">
                <!-- 风险等级 -->
                <div style="background: ${riskColor}; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                    <h3>${riskLevel} 投资者</h3>
                    <p>${riskDescription}</p>
                    <div style="font-size: 1.2em; margin-top: 10px;">
                        <strong>最大回撤承受：${this.userMaxDrawdown}%</strong>
                    </div>
                </div>

                <!-- 详细分析 -->
                <div style="margin: 20px 0;">
                    <h4>🎯 投资建议</h4>
                    <p>${recommendation}</p>
                    ${behaviorAdvice ? `<p style="color: #856404;">${behaviorAdvice}</p>` : ''}
                </div>

                <!-- 资产配置建议 -->
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>💰 建议资产配置</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin: 15px 0;">
                        <div style="text-align: center; background: #e7f3ff; padding: 10px; border-radius: 8px;">
                            <strong>存款</strong><br>
                            ${this.getRecommendedAllocation(riskLevel, 'saving')}%
                        </div>
                        <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 8px;">
                            <strong>国债ETF</strong><br>
                            ${this.getRecommendedAllocation(riskLevel, 'bond')}%
                        </div>
                        <div style="text-align: center; background: #e8f5e8; padding: 10px; border-radius: 8px;">
                            <strong>沪深300ETF</strong><br>
                            ${this.getRecommendedAllocation(riskLevel, 'stock')}%
                        </div>
                        <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 8px;">
                            <strong>黄金ETF</strong><br>
                            ${this.getRecommendedAllocation(riskLevel, 'gold')}%
                        </div>
                    </div>
                    <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                        基于你的风险等级推荐的起始配置比例
                    </p>
                </div>

                <!-- 风险提示 -->
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>⚠️ 重要提示</h4>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>风险承受能力会随着经验和市场环境变化</li>
                        <li>建议每半年重新评估一次风险偏好</li>
                        <li>投资有风险，入市需谨慎</li>
                    </ul>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="practicalTraining.startAssetAllocation()" 
                            style="background: #28a745; padding: 12px 20px;">
                        🚀 开始资产配置
                    </button>
                    <button onclick="practicalTraining.showRiskToleranceSelection()" 
                            style="background: #17a2b8; padding: 12px 20px;">
                        🔄 重新评估风险
                    </button>
                    <button onclick="practicalTraining.showEconomicAnalysis(JSON.parse(document.getElementById('economicData').value))" 
                            style="background: #6c757d; padding: 12px 20px;">
                        ← 返回经济分析
                    </button>
                </div>
            </div>
        `;
    }

    // 获取推荐配置比例
    getRecommendedAllocation(riskLevel, assetType) {
        const allocations = {
            '保守型': { saving: 40, bond: 35, stock: 15, gold: 10 },
            '平衡型': { saving: 25, bond: 25, stock: 35, gold: 15 },
            '进取型': { saving: 15, bond: 20, stock: 50, gold: 15 }
        };
        
        return allocations[riskLevel][assetType];
    }

    // 开始资产配置
    startAssetAllocation() {
        // 获取推荐配置
        let riskLevel;
        if (this.userMaxDrawdown <= 10) riskLevel = "保守型";
        else if (this.userMaxDrawdown <= 20) riskLevel = "平衡型";
        else riskLevel = "进取型";
        
        const recommended = this.getRecommendedAllocation(riskLevel, 'all');
        
        // 设置默认值为推荐配置
        this.showAssetAllocation(recommended);
    }

    // 显示资产配置界面（简化版）
    showAssetAllocation(recommendedAllocation = null) {
        const defaultAllocation = recommendedAllocation || { saving: 2500, bond: 2500, stock: 2500, gold: 2500 };
        
        document.querySelector('.container').innerHTML = `
            <h2>💰 ${this.currentYear}年资产配置</h2>
            <div class="concept-card">
                <h3>基于你的风险偏好进行配置</h3>
                <p>你的风险等级：<strong>${this.getRiskLevelText()}</strong> | 最大回撤承受：<strong>${this.userMaxDrawdown}%</strong></p>
                <p>分配10,000元资金到以下资产：</p>
                
                <div style="margin: 25px 0;">
                    <div class="investment-option">
                        <label>💰 银行存款</label>
                        <input type="number" id="ptSavingAmount" value="${defaultAllocation.saving}" min="0" max="10000" 
                               onchange="practicalTraining.updatePTInvestmentTotal()" style="width: 120px;">
                        <span>元</span>
                    </div>
                    
                    <div class="investment-option">
                        <label>📄 国债ETF 511010</label>
                        <input type="number" id="ptBondAmount" value="${defaultAllocation.bond}" min="0" max="10000"
                               onchange="practicalTraining.updatePTInvestmentTotal()" style="width: 120px;">
                        <span>元</span>
                    </div>
                    
                    <div class="investment-option">
                        <label>📈 沪深300ETF 159919</label>
                        <input type="number" id="ptFundAmount" value="${defaultAllocation.stock}" min="0" max="10000"
                               onchange="practicalTraining.updatePTInvestmentTotal()" style="width: 120px;">
                        <span>元</span>
                    </div>
                    
                    <div class="investment-option">
                        <label>🟡 黄金ETF 518880</label>
                        <input type="number" id="ptGoldAmount" value="${defaultAllocation.gold}" min="0" max="10000"
                               onchange="practicalTraining.updatePTInvestmentTotal()" style="width: 120px;">
                        <span>元</span>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p>已分配: <span id="ptAllocatedTotal">10000</span> 元 / 10,000元</p>
                    <p>剩余: <span id="ptRemainingAmount">0</span> 元</p>
                    <div class="progress-bar">
                        <div class="progress" id="ptAllocationProgress" style="width: 100%"></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="practicalTraining.runPTSimulation()" id="ptSimulateBtn" 
                            style="background: #28a745; padding: 12px 20px;">
                        📊 计算投资收益
                    </button>
                    <button onclick="practicalTraining.showRiskAssessmentResult()" 
                            style="background: #17a2b8; padding: 12px 20px;">
                        🔄 调整风险偏好
                    </button>
                </div>
            </div>
        `;
        
        this.updatePTInvestmentTotal();
    }

    // 获取风险等级文本
    getRiskLevelText() {
        if (this.userMaxDrawdown <= 10) return "保守型";
        if (this.userMaxDrawdown <= 20) return "平衡型";
        return "进取型";
    }

    // 更新总投资金额
    updatePTInvestmentTotal() {
        const saving = parseInt(document.getElementById('ptSavingAmount').value) || 0;
        const bond = parseInt(document.getElementById('ptBondAmount').value) || 0;
        const fund = parseInt(document.getElementById('ptFundAmount').value) || 0;
        const gold = parseInt(document.getElementById('ptGoldAmount').value) || 0;
        
        const total = saving + bond + fund + gold;
        const remaining = 10000 - total;
        
        document.getElementById('ptAllocatedTotal').textContent = total;
        document.getElementById('ptRemainingAmount').textContent = remaining;
        document.getElementById('ptAllocationProgress').style.width = (total / 10000 * 100) + '%';
        
        const simulateBtn = document.getElementById('ptSimulateBtn');
        if (total === 10000) {
            simulateBtn.disabled = false;
        } else {
            simulateBtn.disabled = true;
        }
    }


  // 运行实战模拟计算收益
runPTSimulation() {
    console.log('=== 开始计算投资收益 ===');
    
    try {
         // 1. 获取经济数据 - 修改这里
        if (!this.currentYear) {
            throw new Error('未选择训练年份，请重新选择年份开始训练');
        }
        
        const data = this.getHistoricalETFData(this.currentYear);
        if (!data) {
            throw new Error(`找不到 ${this.currentYear} 年的经济数据`);
        }
        
        console.log('经济数据:', data);
        
        // 2. 获取用户配置
        const saving = this.getInputValue('ptSavingAmount');
        const bond = this.getInputValue('ptBondAmount');
        const fund = this.getInputValue('ptFundAmount');
        const gold = this.getInputValue('ptGoldAmount');
        
        console.log('用户配置:', { saving, bond, fund, gold });
        
        // 3. 验证总额
        const total = saving + bond + fund + gold;
        if (total !== 10000) {
            alert(`❌ 投资总额应为10,000元，当前为${total}元\n请重新分配资金`);
            return;
        }
        
        // 4. 计算收益
        const savingReturn = saving * (parseFloat(data.depositRate) / 100);
        const bondReturn = bond * (parseFloat(data.bondReturn) / 100);
        const fundReturn = fund * (parseFloat(data.hs300Return) / 100);
        const goldReturn = gold * (parseFloat(data.goldReturn) / 100);

        const totalReturn = savingReturn + bondReturn + fundReturn + goldReturn;
        const totalReturnRate = (totalReturn / 10000) * 100;

        console.log('收益计算完成:', {
            savingReturn, bondReturn, fundReturn, goldReturn,
            totalReturn, totalReturnRate
        });
        
        // 5. 计算配置比例
        const savingPercent = (saving / 10000 * 100).toFixed(0);
        const bondPercent = (bond / 10000 * 100).toFixed(0);
        const fundPercent = (fund / 10000 * 100).toFixed(0);
        const goldPercent = (gold / 10000 * 100).toFixed(0);

        // 6. 计算风险指标
        const estimatedMaxDrawdown = this.estimateMaxDrawdown(fund, gold, data);
        const volatility = this.calculateVolatility(fund, gold, data);
        const sharpeRatio = this.calculateSharpeRatio(totalReturnRate, volatility);

        // 7. 记录模拟结果
        const simulationResult = {
            timestamp: new Date().toLocaleString(),
            allocation: {
                saving: saving, bond: bond, fund: fund, gold: gold,
                savingPercent: savingPercent, bondPercent: bondPercent, 
                fundPercent: fundPercent, goldPercent: goldPercent
            },
            returns: {
                savingReturn: savingReturn, bondReturn: bondReturn,
                fundReturn: fundReturn, goldReturn: goldReturn,
                totalReturn: totalReturn, totalReturnRate: totalReturnRate
            },
            riskMetrics: {
                maxDrawdown: estimatedMaxDrawdown,
                volatility: volatility,
                sharpeRatio: sharpeRatio
            },
            year: this.currentYear,
            economicCycle: data.economicCycle
        };

        this.simulationHistory.push(simulationResult);

        // 8. 显示结果
        this.showDetailedSimulationResult(simulationResult, data);
        
        console.log('=== 投资收益计算完成 ===');
        
    } catch (error) {
        console.error('计算投资收益时出错:', error);
        alert(`计算失败: ${error.message}\n请重新选择年份开始训练`);
        this.showPracticalTraining();
    }
}

// 辅助方法：安全获取输入值
getInputValue(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`找不到输入框: ${elementId}`);
    }
    const value = parseInt(element.value);
    return isNaN(value) ? 0 : value;
}

// 估算最大回撤
estimateMaxDrawdown(fund, gold, data) {
    try {
        const fundRisk = Math.max(Math.abs(parseFloat(data.hs300Return)) * 0.8, 15);
        const goldRisk = Math.max(Math.abs(parseFloat(data.goldReturn)) * 0.6, 8);
        const bondRisk = 3;
        const savingRisk = 0;
        
        const totalRisk = (fund * fundRisk + gold * goldRisk + 
                         bondRisk * 2500 + savingRisk * 2500) / 10000;
        
        return Math.min(totalRisk, 40).toFixed(1);
    } catch (error) {
        console.error('计算最大回撤时出错:', error);
        return '15.0';
    }
}

// 计算波动率
calculateVolatility(fund, gold, data) {
    try {
        const fundVol = Math.abs(parseFloat(data.hs300Return)) * 1.2;
        const goldVol = Math.abs(parseFloat(data.goldReturn)) * 0.8;
        const bondVol = 2;
        
        return (fund * fundVol + gold * goldVol + bondVol * 2500) / 10000;
    } catch (error) {
        console.error('计算波动率时出错:', error);
        return 10;
    }
}

// 计算夏普比率
calculateSharpeRatio(returnRate, volatility) {
    try {
        if (volatility === 0) return '0.00';
        return (returnRate / volatility).toFixed(2);
    } catch (error) {
        console.error('计算夏普比率时出错:', error);
        return '1.00';
    }
}
    // 显示详细模拟结果
    showDetailedSimulationResult(result, data) {
        const isPositive = result.returns.totalReturnRate >= 0;
        const riskLevel = this.getRiskLevelText();

        document.querySelector('.container').innerHTML = `
            <h2>📈 ${this.currentYear}年投资回测结果</h2>
            <div class="concept-card">
                <!-- 总体收益 -->
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 3em; margin-bottom: 10px;">
                        ${isPositive ? '📈' : '📉'}
                    </div>
                    <h3 style="color: ${isPositive ? '#28a745' : '#dc3545'};">
                        总收益: ${result.returns.totalReturn.toFixed(2)}元 (${result.returns.totalReturnRate.toFixed(2)}%)
                    </h3>
                    <p>初始资金: 10,000元 → 最终资产: <strong>${(10000 + result.returns.totalReturn).toFixed(2)}元</strong></p>
                </div>

                <!-- 经济环境 -->
                <div style="background: ${this.getCycleColor(data.economicCycle)}; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>${this.getCycleEmoji(data.economicCycle)} ${this.currentYear}年经济环境</h4>
                    <p><strong>周期:</strong> ${data.economicCycle} | <strong>你的风险等级:</strong> ${riskLevel}</p>
                    <p>${data.events}</p>
                </div>

                <!-- 资产配置和收益明细 -->
                <div style="margin: 20px 0;">
                    <h4>💰 资产配置与收益明细</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                        <!-- 存款 -->
                        <div style="background: #e7f3ff; padding: 15px; border-radius: 8px;">
                            <strong>💰 银行存款</strong>
                            <div style="margin-top: 10px;">
                                <div>配置: ${result.allocation.savingPercent}% (${result.allocation.saving}元)</div>
                                <div>收益: <span style="color: #28a745;">+${result.returns.savingReturn.toFixed(2)}元</span></div>
                                <div>收益率: ${data.depositRate}</div>
                            </div>
                        </div>
                        
                        <!-- 国债ETF -->
                        <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
                            <strong>📄 国债ETF 511010</strong>
                            <div style="margin-top: 10px;">
                                <div>配置: ${result.allocation.bondPercent}% (${result.allocation.bond}元)</div>
                                <div>收益: <span style="color: #28a745;">+${result.returns.bondReturn.toFixed(2)}元</span></div>
                                <div>收益率: ${data.bondReturn}</div>
                            </div>
                        </div>
                        
                        <!-- 沪深300ETF -->
                        <div style="background: ${result.returns.fundReturn >= 0 ? '#d4edda' : '#f8d7da'}; padding: 15px; border-radius: 8px;">
                            <strong>📈 沪深300ETF 159919</strong>
                            <div style="margin-top: 10px;">
                                <div>配置: ${result.allocation.fundPercent}% (${result.allocation.fund}元)</div>
                                <div>收益: <span style="color: ${result.returns.fundReturn >= 0 ? '#28a745' : '#dc3545'};">${result.returns.fundReturn >= 0 ? '+' : ''}${result.returns.fundReturn.toFixed(2)}元</span></div>
                                <div>收益率: ${data.hs300Return}</div>
                            </div>
                        </div>
                        
                        <!-- 黄金ETF -->
                        <div style="background: ${result.returns.goldReturn >= 0 ? '#d4edda' : '#f8d7da'}; padding: 15px; border-radius: 8px;">
                            <strong>🟡 黄金ETF 518880</strong>
                            <div style="margin-top: 10px;">
                                <div>配置: ${result.allocation.goldPercent}% (${result.allocation.gold}元)</div>
                                <div>收益: <span style="color: ${result.returns.goldReturn >= 0 ? '#28a745' : '#dc3545'};">${result.returns.goldReturn >= 0 ? '+' : ''}${result.returns.goldReturn.toFixed(2)}元</span></div>
                                <div>收益率: ${data.goldReturn}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 风险指标 -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>⚡ 风险指标分析</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0;">
                        <div style="text-align: center;">
                            <strong>预计最大回撤</strong><br>
                            <span style="color: ${result.riskMetrics.maxDrawdown <= this.userMaxDrawdown ? '#28a745' : '#dc3545'}; font-size: 1.2em;">
                                ${result.riskMetrics.maxDrawdown}%
                            </span><br>
                            <small>${result.riskMetrics.maxDrawdown <= this.userMaxDrawdown ? '✅ 在承受范围内' : '⚠️ 超出承受能力'}</small>
                        </div>
                        <div style="text-align: center;">
                            <strong>波动率</strong><br>
                            <span style="font-size: 1.2em;">${result.riskMetrics.volatility.toFixed(1)}%</span><br>
                            <small>${result.riskMetrics.volatility < 10 ? '低波动' : result.riskMetrics.volatility < 20 ? '中波动' : '高波动'}</small>
                        </div>
                        <div style="text-align: center;">
                            <strong>夏普比率</strong><br>
                            <span style="font-size: 1.2em;">${result.riskMetrics.sharpeRatio}</span><br>
                            <small>${result.riskMetrics.sharpeRatio > 1 ? '收益良好' : '收益一般'}</small>
                        </div>
                    </div>
                </div>

                <!-- 绩效分析 -->
                <div style="background: ${isPositive ? '#d4edda' : '#f8d7da'}; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>📊 绩效分析</h4>
                    ${this.getPerformanceAnalysis(result, data)}
                </div>

                <!-- 改进建议 -->
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <h4>💡 投资建议</h4>
                    ${this.getInvestmentAdvice(result, data)}
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="practicalTraining.showAssetAllocation()" style="background: #28a745; padding: 12px 20px;">
                        🔄 重新配置资产
                    </button>
                    <button onclick="practicalTraining.showAIOptimization()" style="background: #17a2b8; padding: 12px 20px;">
                        🤖 AI优化建议
                    </button>
                    <button onclick="practicalTraining.showSimulationHistory()" style="background: #6f42c1; padding: 12px 20px;">
                        📈 查看历史记录
                    </button>
                    <button onclick="practicalTraining.showPracticalTraining()" style="background: #6c757d; padding: 12px 20px;">
                        🎯 新的训练
                    </button>
                </div>
            </div>
        `;
    }

    // 获取绩效分析 - 改进版本
getPerformanceAnalysis(result, data) {
    const balancedReturn = this.calculateBalancedReturn(data);
    const vsBalanced = result.returns.totalReturnRate - balancedReturn;
    
    let analysis = `<p><strong>vs 均衡配置(各25%):</strong> `;
    analysis += vsBalanced >= 0 ? 
        `<span style="color: #28a745;">超越 ${vsBalanced.toFixed(1)}%</span>` : 
        `<span style="color: #dc3545;">落后 ${Math.abs(vsBalanced).toFixed(1)}%</span>`;
    analysis += `</p>`;

    // 计算各资产对总收益的实际贡献（按金额）
    const totalReturn = result.returns.totalReturn;
    let contributions;
    if (totalReturn === 0) {
        contributions = { saving: 0, bond: 0, fund: 0, gold: 0 };
    } else {
        contributions = {
            saving: (result.returns.savingReturn / totalReturn * 100).toFixed(1),
            bond: (result.returns.bondReturn / totalReturn * 100).toFixed(1),
            fund: (result.returns.fundReturn / totalReturn * 100).toFixed(1),
            gold: (result.returns.goldReturn / totalReturn * 100).toFixed(1)
        };
    }

    // 更清晰的显示方式
    analysis += `<p><strong>收益构成分析:</strong></p>`;
    analysis += `<div style="margin-left: 20px;">`;
    analysis += `<div>📈 股票: ${result.returns.fundReturn >= 0 ? '贡献' : '拖累'} ${Math.abs(contributions.fund)}%</div>`;
    analysis += `<div>📄 债券: ${result.returns.bondReturn >= 0 ? '贡献' : '拖累'} ${Math.abs(contributions.bond)}%</div>`;
    analysis += `<div>🟡 黄金: ${result.returns.goldReturn >= 0 ? '贡献' : '拖累'} ${Math.abs(contributions.gold)}%</div>`;
    analysis += `<div>💰 存款: ${result.returns.savingReturn >= 0 ? '贡献' : '拖累'} ${Math.abs(contributions.saving)}%</div>`;
    analysis += `</div>`;

    return analysis;
}

    // 计算均衡配置收益
    calculateBalancedReturn(data) {
        return (parseFloat(data.depositRate) + parseFloat(data.bondReturn) + 
                parseFloat(data.hs300Return) + parseFloat(data.goldReturn)) / 4;
    }

    // 获取投资建议
    getInvestmentAdvice(result, data) {
        let advice = '';
        const stockPercent = result.allocation.fundPercent;
        const bondPercent = result.allocation.bondPercent;
        
        // 基于经济周期的建议
        if (data.economicCycle === '复苏期' && stockPercent < 30) {
            advice += '<p>💡 在复苏期，股票配置可能偏低，错过了股市上涨机会。</p>';
        } else if (data.economicCycle === '衰退期' && stockPercent > 40) {
            advice += '<p>💡 在衰退期，股票配置可能偏高，承受了较大下跌风险。</p>';
        }

        // 基于风险控制的建议
        if (result.riskMetrics.maxDrawdown > this.userMaxDrawdown) {
            advice += `<p>⚠️ 组合风险(${result.riskMetrics.maxDrawdown}%)超出你的承受能力(${this.userMaxDrawdown}%)，建议减少股票配置。</p>`;
        }

        // 基于收益的建议
        if (result.returns.totalReturnRate < 0) {
            advice += '<p>📉 组合出现亏损，考虑增加防御性资产(债券、黄金)配置。</p>';
        } else if (result.returns.totalReturnRate > 15) {
            advice += '<p>🎉 收益优秀！当前配置在当前经济环境下表现良好。</p>';
        }

        return advice || '<p>📊 配置相对合理，可以尝试微调优化。</p>';
    }

    // 显示模拟历史
    showSimulationHistory() {
        if (this.simulationHistory.length === 0) {
            alert('暂无模拟记录，请先完成一次投资模拟。');
            return;
        }

        let historyHTML = '';
        this.simulationHistory.forEach((record, index) => {
            const isPositive = record.returns.totalReturnRate >= 0;
            historyHTML += `
                <div style="background: ${isPositive ? '#e8f5e8' : '#ffebee'}; padding: 15px; margin: 10px 0; border-radius: 8px;">
                    <strong>第${index + 1}次模拟 - ${record.year}年</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 10px;">
                        <div>收益: <span style="color: ${isPositive ? '#28a745' : '#dc3545'};">${record.returns.totalReturnRate.toFixed(1)}%</span></div>
                        <div>配置: 股${record.allocation.fundPercent}% 债${record.allocation.bondPercent}%</div>
                        <div>风险: ${record.riskMetrics.maxDrawdown}%</div>
                    </div>
                    <div style="font-size: 0.8em; color: #666; margin-top: 5px;">${record.timestamp}</div>
                </div>
            `;
        });

        document.querySelector('.container').innerHTML = `
            <h2>📈 模拟历史记录</h2>
            <div class="concept-card">
                <h3>历史模拟对比</h3>
                <p>共 ${this.simulationHistory.length} 次模拟记录</p>
                ${historyHTML}
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                      <button onclick="practicalTraining.returnToLatestResult()" 
                           style="background: #17a2b8; padding: 12px 20px;">
                        ← 返回最新结果
                    </button>
                    <button onclick="practicalTraining.clearHistory()" style="background: #dc3545; padding: 12px 20px;">
                        🗑️ 清空记录
                    </button>
                </div>
            </div>
        `;
    }

    // 新增方法：返回最新结果
returnToLatestResult() {
    if (this.simulationHistory.length === 0) {
        alert('暂无模拟记录');
        return;
    }
    
    const latestResult = this.simulationHistory[this.simulationHistory.length - 1];
    
    // 重新获取该年份的经济数据
    const yearData = this.getHistoricalETFData(latestResult.year);
    if (yearData) {
        this.showDetailedSimulationResult(latestResult, yearData);
    } else {
        alert('无法找到对应的经济数据，请重新进行模拟训练。');
        this.showPracticalTraining();
    }
}
    // 清空历史记录
    clearHistory() {
        if (confirm('确定要清空所有模拟记录吗？')) {
            this.simulationHistory = [];
            alert('记录已清空！');
            this.showSimulationHistory();
        }
    }
// 返回经济分析页面
returnToEconomicAnalysis() {
    try {
        console.log('返回经济分析，当前年份:', this.currentYear);
        
        if (!this.currentYear) {
            // 如果没有当前年份，返回实战训练主页
            this.showPracticalTraining();
            return;
        }
        
        // 重新获取该年份的经济数据
        const data = this.getHistoricalETFData(this.currentYear);
        if (data) {
            this.showEconomicAnalysis(data);
        } else {
            throw new Error(`无法获取 ${this.currentYear} 年的经济数据`);
        }
    } catch (error) {
        console.error('返回经济分析出错:', error);
        alert('返回经济分析失败: ' + error.message);
        // 降级处理：返回实战训练主页
        this.showPracticalTraining();
    }
}

// 返回最新模拟结果（已存在，确保正确）
returnToLatestResult() {
    if (this.simulationHistory.length === 0) {
        alert('暂无模拟记录');
        this.showPracticalTraining();
        return;
    }
    
    const latestResult = this.simulationHistory[this.simulationHistory.length - 1];
    
    // 重新获取该年份的经济数据
    const yearData = this.getHistoricalETFData(latestResult.year);
    if (yearData) {
        this.showDetailedSimulationResult(latestResult, yearData);
    } else {
        alert('无法找到对应的经济数据，请重新进行模拟训练。');
        this.showPracticalTraining();
    }
}

  // 显示AI优化建议
showAIOptimization() {
    try {
        console.log('开始AI优化计算...');
        
        // 获取当前年份的经济数据
        const data = this.getHistoricalETFData(this.currentYear);
        if (!data) {
            throw new Error('无法获取经济数据');
        }
        
        // 获取用户风险承受能力
        const maxDrawdown = this.userMaxDrawdown;
        
        console.log('优化参数:', { maxDrawdown, economicCycle: data.economicCycle });
        
        // 运行AI优化算法
        const optimizedAllocation = this.calculateOptimalAllocation(data, maxDrawdown);
        
        console.log('优化结果:', optimizedAllocation);
        
        // 显示优化结果
        this.showOptimizationResult(optimizedAllocation, data);
        
    } catch (error) {
        console.error('AI优化出错:', error);
        alert('AI优化功能暂时不可用，请稍后重试\n错误信息: ' + error.message);
    }
}

// 计算最优资产配置
calculateOptimalAllocation(data, maxDrawdown) {
    // 资产预期收益率（基于历史数据）
    const expectedReturns = {
        saving: parseFloat(data.depositRate) / 100,
        bond: parseFloat(data.bondReturn) / 100,
        fund: parseFloat(data.hs300Return) / 100,
        gold: parseFloat(data.goldReturn) / 100
    };
    
    console.log('预期收益率:', expectedReturns);
    
    // 资产风险（波动率估计）
    const volatilities = {
        saving: 0.01,    // 存款波动率很低
        bond: 0.03,      // 债券中等波动
        fund: Math.max(Math.abs(expectedReturns.fund) * 1.5, 0.15), // 股票波动率较高
        gold: Math.max(Math.abs(expectedReturns.gold) * 1.2, 0.08) // 黄金中等波动
    };
    
    // 资产相关性矩阵（简化估计）
    const correlations = {
        saving_bond: 0.1,
        saving_fund: -0.1,
        saving_gold: 0.0,
        bond_fund: -0.3,
        bond_gold: 0.2,
        fund_gold: 0.4
    };
    
    // 运行蒙特卡洛模拟寻找最优配置
    return this.monteCarloOptimization(expectedReturns, volatilities, correlations, maxDrawdown);
}

// 蒙特卡洛优化算法 - 修复版本
monteCarloOptimization(expectedReturns, volatilities, correlations, maxDrawdown) {
    const numSimulations = 5000;
    let bestAllocation = null;
    let bestSharpeRatio = -Infinity;
    
    console.log('开始蒙特卡洛模拟...');
    
    for (let i = 0; i < numSimulations; i++) {
        // 生成随机资产配置（总和为100%）
        const allocation = this.generateRandomAllocation();
        
        // 计算预期组合收益
        const portfolioReturn = this.calculatePortfolioReturn(allocation, expectedReturns);
        
        // 计算组合风险
        const portfolioRisk = this.calculatePortfolioRisk(allocation, volatilities, correlations);
        
        // 计算夏普比率（风险调整后收益）
        const sharpeRatio = portfolioRisk > 0 ? portfolioReturn / portfolioRisk : 0;
        
        // 估算最大回撤（简化计算）
        const estimatedDrawdown = this.estimatePortfolioDrawdown(allocation, volatilities);
        
        // 检查是否符合风险约束
        if (estimatedDrawdown <= maxDrawdown) {
            // 选择夏普比率最高的配置
            if (sharpeRatio > bestSharpeRatio) {
                bestSharpeRatio = sharpeRatio;
                bestAllocation = {
                    saving: allocation.saving,
                    bond: allocation.bond,
                    fund: allocation.fund,
                    gold: allocation.gold,
                    expectedReturn: portfolioReturn,
                    expectedRisk: portfolioRisk,
                    sharpeRatio: sharpeRatio,
                    estimatedDrawdown: estimatedDrawdown
                };
            }
        }
    }
    
    // 如果没有找到符合约束的配置，返回均衡配置
    if (!bestAllocation) {
        console.log('未找到符合约束的配置，使用均衡配置');
        const equalAllocation = { saving: 25, bond: 25, fund: 25, gold: 25 };
        const portfolioReturn = this.calculatePortfolioReturn(equalAllocation, expectedReturns);
        const portfolioRisk = this.calculatePortfolioRisk(equalAllocation, volatilities, correlations);
        const sharpeRatio = portfolioRisk > 0 ? portfolioReturn / portfolioRisk : 0;
        
        return {
            saving: 25.0,
            bond: 25.0,
            fund: 25.0,
            gold: 25.0,
            expectedReturn: portfolioReturn,
            expectedRisk: portfolioRisk,
            sharpeRatio: sharpeRatio,
            estimatedDrawdown: this.estimatePortfolioDrawdown(equalAllocation, volatilities)
        };
    }
    
    console.log('找到最优配置:', bestAllocation);
    
    // 返回保留一位小数的配置
    return {
        saving: parseFloat(bestAllocation.saving.toFixed(1)),
        bond: parseFloat(bestAllocation.bond.toFixed(1)),
        fund: parseFloat(bestAllocation.fund.toFixed(1)),
        gold: parseFloat(bestAllocation.gold.toFixed(1)),
        expectedReturn: bestAllocation.expectedReturn,
        expectedRisk: bestAllocation.expectedRisk,
        sharpeRatio: bestAllocation.sharpeRatio,
        estimatedDrawdown: bestAllocation.estimatedDrawdown
    };
}

// 生成随机资产配置
generateRandomAllocation() {
    // 生成4个随机数
    const randoms = [Math.random(), Math.random(), Math.random(), Math.random()];
    const sum = randoms.reduce((a, b) => a + b, 0);
    
    // 归一化为百分比
    return {
        saving: (randoms[0] / sum) * 100,
        bond: (randoms[1] / sum) * 100,
        fund: (randoms[2] / sum) * 100,
        gold: (randoms[3] / sum) * 100
    };
}

// 计算组合收益
calculatePortfolioReturn(allocation, expectedReturns) {
    return (
        (allocation.saving * expectedReturns.saving +
        allocation.bond * expectedReturns.bond +
        allocation.fund * expectedReturns.fund +
        allocation.gold * expectedReturns.gold) / 100
    );
}

// 计算组合风险
calculatePortfolioRisk(allocation, volatilities, correlations) {
    const weights = [
        allocation.saving / 100,
        allocation.bond / 100,
        allocation.fund / 100,
        allocation.gold / 100
    ];
    
    const vars = [
        Math.pow(volatilities.saving, 2),
        Math.pow(volatilities.bond, 2),
        Math.pow(volatilities.fund, 2),
        Math.pow(volatilities.gold, 2)
    ];
    
    // 计算组合方差
    let portfolioVariance = 0;
    for (let i = 0; i < 4; i++) {
        portfolioVariance += Math.pow(weights[i], 2) * vars[i];
        for (let j = i + 1; j < 4; j++) {
            const corr = this.getCorrelation(i, j, correlations);
            portfolioVariance += 2 * weights[i] * weights[j] * Math.sqrt(vars[i] * vars[j]) * corr;
        }
    }
    
    return Math.sqrt(portfolioVariance);
}

// 获取资产相关性
getCorrelation(i, j, correlations) {
    const assets = ['saving', 'bond', 'fund', 'gold'];
    const key = `${assets[i]}_${assets[j]}`;
    const reverseKey = `${assets[j]}_${assets[i]}`;
    
    return correlations[key] || correlations[reverseKey] || 0;
}

// 估算组合最大回撤
estimatePortfolioDrawdown(allocation, volatilities) {
    // 简化估算：加权平均波动率 * 风险乘数
    const weightedVol = (
        allocation.saving * volatilities.saving +
        allocation.bond * volatilities.bond +
        allocation.fund * volatilities.fund +
        allocation.gold * volatilities.gold
    ) / 100;
    
    // 考虑资产相关性后的回撤估算
    return Math.min(weightedVol * 2.5 * 100, 40); // 年化波动率 * 调整系数
}

// 显示优化结果
// 显示优化结果
showOptimizationResult(optimizedAllocation, data) {
    const currentAllocation = this.getCurrentAllocation();
    const improvement = this.calculateImprovement(currentAllocation, optimizedAllocation, data);
    
    document.querySelector('.container').innerHTML = `
        <h2>🤖 AI优化建议</h2>
        <div class="concept-card">
            <!-- 优化概述 -->
            <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3>🎯 基于你的风险偏好优化</h3>
                <p>最大回撤限制: <strong>${this.userMaxDrawdown}%</strong> | 经济周期: <strong>${data.economicCycle}</strong></p>
            </div>
            
            <!-- 配置对比 -->
            <div style="margin: 20px 0;">
                <h4>📊 配置对比</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <!-- 当前配置 -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5>你当前的配置 ${currentAllocation.isDefault ? '(默认)' : ''}</h5>
                        <div style="margin: 10px 0;">
                            <div>💰 存款: ${currentAllocation.saving.toFixed(1)}%</div>
                            <div>📄 债券: ${currentAllocation.bond.toFixed(1)}%</div>
                            <div>📈 股票: ${currentAllocation.fund.toFixed(1)}%</div>
                            <div>🟡 黄金: ${currentAllocation.gold.toFixed(1)}%</div>
                        </div>
                        <div style="color: #666; font-size: 0.9em;">
                            预期收益: ${(currentAllocation.expectedReturn * 100).toFixed(1)}%
                            ${currentAllocation.isDefault ? '<br><small style="color: #dc3545;">⚠️ 检测到默认配置，请确认</small>' : ''}
                        </div>
                    </div>
                    
                    <!-- AI优化配置 -->
                    <div style="background: #d4edda; padding: 15px; border-radius: 8px; border: 2px solid #28a745;">
                        <h5>🤖 AI优化配置</h5>
                        <div style="margin: 10px 0;">
                            <div>💰 存款: <strong>${optimizedAllocation.saving.toFixed(1)}%</strong></div>
                            <div>📄 债券: <strong>${optimizedAllocation.bond.toFixed(1)}%</strong></div>
                            <div>📈 股票: <strong>${optimizedAllocation.fund.toFixed(1)}%</strong></div>
                            <div>🟡 黄金: <strong>${optimizedAllocation.gold.toFixed(1)}%</strong></div>
                        </div>
                        <div style="color: #28a745; font-weight: bold;">
                            预期收益: ${(optimizedAllocation.expectedReturn * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 优化效果 -->
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>📈 优化效果分析</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0;">
                    <div style="text-align: center;">
                        <strong>收益提升</strong><br>
                        <span style="color: #28a745; font-size: 1.2em;">+${improvement.returnImprovement}%</span>
                    </div>
                    <div style="text-align: center;">
                        <strong>夏普比率</strong><br>
                        <span style="color: #17a2b8; font-size: 1.2em;">${optimizedAllocation.sharpeRatio.toFixed(2)}</span>
                    </div>
                    <div style="text-align: center;">
                        <strong>预计回撤</strong><br>
                        <span style="color: ${optimizedAllocation.estimatedDrawdown <= this.userMaxDrawdown ? '#28a745' : '#dc3545'}; font-size: 1.2em;">
                            ${optimizedAllocation.estimatedDrawdown.toFixed(1)}%
                        </span>
                        ${optimizedAllocation.estimatedDrawdown <= this.userMaxDrawdown ? 
                            '<br><small style="color: #28a745;">✅ 符合风险要求</small>' : 
                            '<br><small style="color: #dc3545;">⚠️ 超出风险承受</small>'
                        }
                    </div>
                </div>
            </div>
            
            <!-- 风险指标详情 -->
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>⚡ 风险指标详情</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    <div>
                        <strong>组合波动率:</strong> ${(optimizedAllocation.expectedRisk * 100).toFixed(1)}%
                    </div>
                    <div>
                        <strong>收益风险比:</strong> ${(optimizedAllocation.expectedReturn / optimizedAllocation.expectedRisk).toFixed(2)}
                    </div>
                </div>
            </div>
            
            <!-- 配置说明 -->
            <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>💡 配置逻辑说明</h4>
                <p>${this.getOptimizationExplanation(optimizedAllocation, data)}</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                    <strong>优化依据:</strong> 基于现代投资组合理论，在您设定的 ${this.userMaxDrawdown}% 最大回撤限制内，通过蒙特卡洛模拟寻找最优的夏普比率配置。
                </p>
            </div>
            
            <!-- 经济环境分析 -->
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>🌍 经济环境适配</h4>
                <p>当前 ${this.currentYear} 年处于 <strong>${data.economicCycle}</strong>，AI优化配置充分考虑了以下因素：</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>${data.events}</li>
                    <li>GDP增长率: ${data.gdp}，CPI通胀率: ${data.cpi}</li>
                    <li>各资产历史表现: 股票${data.hs300Return}，债券${data.bondReturn}，黄金${data.goldReturn}</li>
                </ul>
            </div>
            
            <!-- 风险提示 -->
            <div style="background: #ffebee; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>⚠️ 重要提示</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>AI建议基于历史数据和数学模型，不代表未来表现</li>
                    <li>实际投资需考虑个人财务状况和风险承受能力</li>
                    <li>市场环境变化可能导致优化效果与预期不符</li>
                    <li>建议结合自身判断做出投资决策，定期回顾调整</li>
                </ul>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="practicalTraining.applyOptimizedAllocation(${optimizedAllocation.saving}, ${optimizedAllocation.bond}, ${optimizedAllocation.fund}, ${optimizedAllocation.gold})" 
                        style="background: #28a745; padding: 12px 20px;">
                    ✅ 应用优化配置
                </button>
                <button onclick="practicalTraining.returnToLatestResult()" 
                        style="background: #17a2b8; padding: 12px 20px;">
                    ← 返回模拟结果
                </button>
                <button onclick="practicalTraining.showAssetAllocation()" 
                        style="background: #6c757d; padding: 12px 20px;">
                    🔄 手动配置
                </button>
                <button onclick="practicalTraining.debugCurrentState()" 
                        style="background: #ffc107; color: #000; padding: 12px 20px;">
                    🐛 调试信息
                </button>
            </div>
        </div>
    `;
}

// 获取当前配置 - 最终修复版本
getCurrentAllocation() {
    try {
        console.log('开始读取用户当前配置...');
        
        let saving, bond, fund, gold;
        let source = '';
        
        // 优先级1：从内存中读取最后保存的配置
        if (this.lastAllocation) {
            saving = this.lastAllocation.saving;
            bond = this.lastAllocation.bond;
            fund = this.lastAllocation.fund;
            gold = this.lastAllocation.gold;
            source = '内存';
        } 
        // 优先级2：从输入框读取
        else {
            const savingInput = document.getElementById('ptSavingAmount');
            const bondInput = document.getElementById('ptBondAmount');
            const fundInput = document.getElementById('ptFundAmount');
            const goldInput = document.getElementById('ptGoldAmount');
            
            if (savingInput && bondInput && fundInput && goldInput) {
                saving = parseInt(savingInput.value) || 0;
                bond = parseInt(bondInput.value) || 0;
                fund = parseInt(fundInput.value) || 0;
                gold = parseInt(goldInput.value) || 0;
                source = '输入框';
            } 
            // 优先级3：从模拟记录中获取
            else if (this.simulationHistory.length > 0) {
                const latest = this.simulationHistory[this.simulationHistory.length - 1];
                saving = latest.allocation.saving;
                bond = latest.allocation.bond;
                fund = latest.allocation.fund;
                gold = latest.allocation.gold;
                source = '模拟记录';
            } 
            // 优先级4：使用默认配置
            else {
                console.log('使用默认配置');
                return this.getDefaultAllocation();
            }
        }
        
        console.log(`从${source}读取配置:`, { saving, bond, fund, gold });
        
        const total = saving + bond + fund + gold;
        console.log('总金额:', total);
        
        if (total === 0) {
            console.warn('配置金额为0，使用默认配置');
            return this.getDefaultAllocation();
        }
        
        // 计算实际百分比
        const savingPercent = (saving / total * 100);
        const bondPercent = (bond / total * 100);
        const fundPercent = (fund / total * 100);
        const goldPercent = (gold / total * 100);
        
        console.log('计算出的百分比:', { savingPercent, bondPercent, fundPercent, goldPercent });
        
        const data = this.getHistoricalETFData(this.currentYear);
        const expectedReturns = {
            saving: parseFloat(data.depositRate) / 100,
            bond: parseFloat(data.bondReturn) / 100,
            fund: parseFloat(data.hs300Return) / 100,
            gold: parseFloat(data.goldReturn) / 100
        };
        
        const allocation = {
            saving: savingPercent / 100,
            bond: bondPercent / 100,
            fund: fundPercent / 100,
            gold: goldPercent / 100
        };
        
        const expectedReturn = this.calculatePortfolioReturn(allocation, expectedReturns);
        
        console.log('最终返回的配置:', {
            saving: savingPercent,
            bond: bondPercent,
            fund: fundPercent,
            gold: goldPercent,
            expectedReturn,
            source
        });
        
        return {
            saving: savingPercent,
            bond: bondPercent,
            fund: fundPercent,
            gold: goldPercent,
            expectedReturn: expectedReturn,
            isDefault: false,
            source: source
        };
        
    } catch (error) {
        console.error('获取当前配置出错:', error);
        return this.getDefaultAllocation();
    }
}

// 计算改进效果
calculateImprovement(current, optimized, data) {
    const currentReturn = current.expectedReturn || 0;
    const optimizedReturn = optimized.expectedReturn || 0;
    
    return {
        returnImprovement: ((optimizedReturn - currentReturn) * 100).toFixed(1)
    };
}

// 获取优化说明
getOptimizationExplanation(allocation, data) {
    if (allocation.fund > 50) {
        return 'AI建议增加股票配置，因为在当前经济周期下，股票预期收益较高，且通过分散配置控制了整体风险。';
    } else if (allocation.bond > 40) {
        return 'AI建议侧重债券配置，这有助于在控制回撤的同时获得稳定收益，适合当前的市场环境。';
    } else if (allocation.gold > 30) {
        return 'AI建议增加黄金配置，黄金在当前经济环境下具有较好的避险和抗通胀特性。';
    } else {
        return 'AI建议采用均衡配置策略，在不同资产间分散风险，追求稳健增长。';
    }
}

// 应用优化配置 - 修复版本
applyOptimizedAllocation(savingPercent, bondPercent, fundPercent, goldPercent) {
    try {
        // 转换为具体金额（确保总和为10000）
        const savingAmount = Math.round(savingPercent * 100);
        const bondAmount = Math.round(bondPercent * 100);
        const fundAmount = Math.round(fundPercent * 100);
        const goldAmount = Math.round(goldPercent * 100);
        
        // 由于四舍五入可能导致总和不为10000，需要调整
        const total = savingAmount + bondAmount + fundAmount + goldAmount;
        const difference = 10000 - total;
        
        // 如果有差异，调整最大的资产
        if (difference !== 0) {
            if (difference > 0) {
                // 增加最大的资产
                const maxAsset = Math.max(savingAmount, bondAmount, fundAmount, goldAmount);
                if (savingAmount === maxAsset) savingAmount += difference;
                else if (bondAmount === maxAsset) bondAmount += difference;
                else if (fundAmount === maxAsset) fundAmount += difference;
                else goldAmount += difference;
            } else {
                // 减少最大的资产
                const maxAsset = Math.max(savingAmount, bondAmount, fundAmount, goldAmount);
                if (savingAmount === maxAsset) savingAmount += difference; // difference为负
                else if (bondAmount === maxAsset) bondAmount += difference;
                else if (fundAmount === maxAsset) fundAmount += difference;
                else goldAmount += difference;
            }
        }
        
        // 更新配置界面
        this.showAssetAllocation({
            saving: savingAmount,
            bond: bondAmount,
            fund: fundAmount,
            gold: goldAmount
        });
        
        alert(`✅ 已应用AI优化配置！\n存款: ${savingPercent.toFixed(1)}% | 债券: ${bondPercent.toFixed(1)}% | 股票: ${fundPercent.toFixed(1)}% | 黄金: ${goldPercent.toFixed(1)}%`);
    } catch (error) {
        console.error('应用优化配置出错:', error);
        alert('应用配置时出现错误，请手动调整配置。');
    }
}

    // 辅助方法
    getCycleColor(cycle) {
        const colors = {
            '衰退期': '#ffebee', '复苏期': '#e8f5e8', 
            '通胀期': '#fff3cd', '滞胀期': '#f3e5f5'
        };
        return colors[cycle] || '#e3f2fd';
    }

    getCycleEmoji(cycle) {
        const emojis = {
            '衰退期': '📉', '复苏期': '📈', 
            '通胀期': '💰', '滞胀期': '⚡'
        };
        return emojis[cycle] || '📊';
    }

    getRiskLevelText() {
        if (this.userMaxDrawdown <= 10) return "保守型";
        if (this.userMaxDrawdown <= 20) return "平衡型";
        return "进取型";
    }
}



// 初始化实战训练模块
const practicalTraining = new PracticalTraining();

// 当前模拟的经济周期
let currentEconomicCycle = null;
let simulationAttempts = 0;


// 初始化学习进度
function initProgress() {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
        learningProgress = JSON.parse(savedProgress);
    }
}

let currentQuestion = 1;
const totalQuestions = 16;

function startLearning() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput ? usernameInput.value : '';
    
    if (usernameInput && !username) {
        alert('请输入你的姓名！');
        return;
    }
    
    // 保存用户信息
    if (username) {
        localStorage.setItem('studentName', username);
    }
    
    const savedName = localStorage.getItem('studentName') || '同学';
    showMainMenu(savedName);
}

function showMainMenu(username) {
    document.querySelector('.container').innerHTML = `
        <h1>🎯 欢迎 ${username} 同学！</h1>
        <div class="concept-card">
            <h3>你的学习之旅即将开始</h3>
            <p>选择你想要学习的内容：</p>
        </div>
        <div class="menu">
            <button onclick="showConcept('银行存款')">💰 银行存款 ${getConceptStatus('银行存款')}</button>
            <button onclick="showConcept('国债投资')">📄 国债投资 ${getConceptStatus('国债投资')}</button>
            <button onclick="showConcept('基金基础')">📈 基金基础 ${getConceptStatus('基金基础')}</button>
            <button onclick="showConcept('基金进阶')">🚀 基金进阶 ${getConceptStatus('基金进阶')}</button>
            <button onclick="showConcept('经济周期')">🔄 经济周期 ${getConceptStatus('经济周期')}</button>
            <button onclick="showConcept('投资风险')">⚡ 投资风险 ${getConceptStatus('投资风险')}</button>
            <button onclick="showQuiz()">🧠 知识测试</button>
            <button onclick="showSimulation()">💹 投资模拟</button>
            <button onclick="practicalTraining.showPracticalTraining()">🎯 实战训练</button>
            <button onclick="showProgress()">📊 学习进度</button>
        </div>
    `;
}

// 获取概念学习状态
function getConceptStatus(concept) {
    return learningProgress.completedConcepts.includes(concept) ? '✅' : '';
}

function showConcept(concept) {
    const concepts = {
        '银行存款': {
            title: '💰 银行存款',
            content: '银行存款是最安全的理财方式。把钱存入银行，银行会支付利息。一年定期存款利率约0.95%。<br><br><strong>优点：</strong>非常安全，几乎不会亏损<br><strong>缺点：</strong>收益较低，可能跑不赢通货膨胀',
            difficulty: '初级'
        },
        '国债投资': {
            title: '📄 国债投资', 
            content: '国债是国家向你借钱打的"借条"。10年期国债收益率约1.90%。持有到期很安全。<br><br><strong>优点：</strong>比存款收益高，国家信用背书<br><br><strong>缺点：</strong>如果提前卖出，价格可能会波动',
            difficulty: '初级'
        },
        '基金基础': {
            title: '📈 基金基础',
            content: '基金是把大家的钱集合起来投资。沪深300指数基金包含300家大公司。<br><br><strong>回报组成：</strong><br>• 股息率：约3.2%<br>• 盈利增长：约5-8%<br>• 价格波动：不确定',
            difficulty: '中级'
        },
          '经济周期': {
            title: '🔄 经济周期',
            content: `
                <h4>📈 什么是经济周期？</h4>
                <p>经济就像四季轮回，会经历不同的阶段：<strong>衰退 → 复苏 → 通胀 → 滞胀</strong>，然后循环往复。</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                    <!-- 衰退期 -->
                    <div style="background: #ffebee; padding: 15px; border-radius: 10px; border-left: 4px solid #e53935;">
                        <h5>📉 衰退期 (冬天)</h5>
                        <p><strong>特征：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>CPI: 下降 (0-2%)</li>
                            <li>PPI: 下降</li>
                            <li>PMI: < 50</li>
                            <li>GDP增长放缓</li>
                        </ul>
                        <p><strong>资产配置：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>💵 存款 (40%) - 安全第一</li>
                            <li>📄 国债 (30%) - 利率下降利好</li>
                            <li>📈 沪深300ETF (20%) - 低位布局</li>
                            <li>🟡 黄金ETF (10%) - 避险需求</li>
                        </ul>
                        <p><small><strong>原因：</strong>经济下行时，资金寻求安全资产，债券价格上涨，股票估值较低适合长期投资。</small></p>
                    </div>
                    
                    <!-- 复苏期 -->
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; border-left: 4px solid #43a047;">
                        <h5>📈 复苏期 (春天)</h5>
                        <p><strong>特征：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>CPI: 温和上升 (1-3%)</li>
                            <li>PPI: 开始回升</li>
                            <li>PMI: > 50 且上升</li>
                            <li>企业盈利改善</li>
                        </ul>
                        <p><strong>资产配置：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>📈 沪深300ETF (50%) - 盈利增长</li>
                            <li>📄 国债 (20%) - 适度配置</li>
                            <li>💵 存款 (20%) - 保持流动性</li>
                            <li>🟡 黄金ETF (10%) - 分散风险</li>
                        </ul>
                        <p><small><strong>原因：</strong>经济好转，企业盈利提升，股票表现最好，债券仍有配置价值。</small></p>
                    </div>
                    
                    <!-- 通胀期 -->
                    <div style="background: #fff3cd; padding: 15px; border-radius: 10px; border-left: 4px solid #ffb300;">
                        <h5>💰 通胀期 (夏天)</h5>
                        <p><strong>特征：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>CPI: 较高 (3-5%+)</li>
                            <li>PPI: 大幅上涨</li>
                            <li>PMI: 高位运行</li>
                            <li>央行可能加息</li>
                        </ul>
                        <p><strong>资产配置：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>🟡 黄金ETF (30%) - 抗通胀</li>
                            <li>📈 沪深300ETF (30%) - 选择性强</li>
                            <li>💵 存款 (25%) - 利率上升</li>
                            <li>📄 国债 (15%) - 谨慎配置</li>
                        </ul>
                        <p><small><strong>原因：</strong>通胀侵蚀货币购买力，黄金和部分股票能抗通胀，债券受加息影响较大。</small></p>
                    </div>
                    
                    <!-- 滞胀期 -->
                    <div style="background: #f3e5f5; padding: 15px; border-radius: 10px; border-left: 4px solid #8e24aa;">
                        <h5>⚡ 滞胀期 (秋天)</h5>
                        <p><strong>特征：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>CPI: 高位 (4%+)</li>
                            <li>PPI: 高位</li>
                            <li>PMI: 开始回落</li>
                            <li>经济增长停滞</li>
                        </ul>
                        <p><strong>资产配置：</strong></p>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>🟡 黄金ETF (40%) - 最佳选择</li>
                            <li>💵 存款 (30%) - 安全为主</li>
                            <li>📄 国债 (20%) - 防御性</li>
                            <li>📈 沪深300ETF (10%) - 最低配置</li>
                        </ul>
                        <p><small><strong>原因：</strong>经济停滞+通胀是最差组合，黄金是最好避险资产，股票表现通常较差。</small></p>
                    </div>
                </div>

                <h4>📊 关键经济指标解读</h4>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <strong>CPI (消费者物价指数)</strong><br>
                            <small>衡量物价水平，>3%为通胀预警</small>
                        </div>
                        <div>
                            <strong>PPI (生产者物价指数)</strong><br>
                            <small>衡量工业品价格，领先于CPI</small>
                        </div>
                        <div>
                            <strong>PMI (采购经理指数)</strong><br>
                            <small>>50表示经济扩张，<50表示收缩</small>
                        </div>
                        <div>
                            <strong>GDP (国内生产总值)</strong><br>
                            <small>衡量经济增长速度</small>
                        </div>
                    </div>
                </div>

                <h4>💡 投资策略总结</h4>
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <p><strong>记住这个投资时钟：</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>📉 <strong>衰退期</strong> → 债券 > 存款 > 黄金 > 股票</li>
                        <li>📈 <strong>复苏期</strong> → 股票 > 债券 > 存款 > 黄金</li>
                        <li>💰 <strong>通胀期</strong> → 黄金 > 股票 > 存款 > 债券</li>
                        <li>⚡ <strong>滞胀期</strong> → 黄金 > 存款 > 债券 > 股票</li>
                    </ul>
                    <p><small>💡 提示：观察经济指标变化，及时调整资产配置！</small></p>
                </div>

                <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h5>🎯 实践建议</h5>
                    <p>在"投资模拟"中，你会遇到不同的经济周期，尝试根据学到的知识来配置资产：</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>观察当前处于什么经济周期</li>
                        <li>按照对应的资产配置建议来投资</li>
                        <li>比较不同配置的收益结果</li>
                        <li>总结经验，提高投资技能</li>
                    </ul>
                </div>
            `,
            difficulty: '高级'
        },
        '基金进阶': {
            title: '🚀 基金进阶',
            content: `
                <h4>📊 基金收益三大驱动力</h4>
                <p><strong>基金总收益 = 股息率 + 盈利增长率 + 市盈率变化</strong></p>
                
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <strong>💰 股息率 (约2-4%)</strong><br>
                    公司分红与股价的比率，相对稳定
                </div>
                
                <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <strong>📈 盈利增长率 (EPS增长率)</strong><br>
                    公司赚钱能力的增长，受经济周期影响大
                </div>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <strong>🎭 市盈率变化 (PE变化)</strong><br>
                    市场情绪的温度计，波动最大
                </div>

                <h4>🔄 经济周期对基金收益的影响</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
                    <div style="background: #ffebee; padding: 10px; border-radius: 8px;">
                        <strong>衰退期</strong><br>
                        📉 EPS: -10% 到 -20%<br>
                        📉 PE: 8-12倍<br>
                        💰 股息: 3-4%
                    </div>
                    <div style="background: #e8f5e8; padding: 10px; border-radius: 8px;">
                        <strong>复苏期</strong><br>
                        📈 EPS: 15% 到 25%<br>
                        📈 PE: 12-18倍<br>
                        💰 股息: 2-3%
                    </div>
                    <div style="background: #fff3cd; padding: 10px; border-radius: 8px;">
                        <strong>通胀期</strong><br>
                        📈 EPS: 8% 到 15%<br>
                        📉 PE: 10-14倍<br>
                        💰 股息: 2-3%
                    </div>
                    <div style="background: #f3e5f5; padding: 10px; border-radius: 8px;">
                        <strong>滞胀期</strong><br>
                        📉 EPS: -5% 到 5%<br>
                        📉 PE: 8-11倍<br>
                        💰 股息: 3-4%
                    </div>
                </div>
                
                <p><strong>💡 关键理解：</strong>基金投资既要看企业赚钱能力(EPS)，也要看市场情绪(PE)。不同经济周期下，两者组合千变万化！</p>
            `,
            difficulty: '高级'
        },
        '投资风险': {
            title: '⚡ 投资风险',
            content: '所有投资都有风险！主要风险来源：<br><br>• <strong>市场风险：</strong>价格波动可能导致亏损<br>• <strong>利率风险：</strong>利率变化影响债券价格<br>• <strong>通胀风险：</strong>收益可能赶不上物价上涨',
            difficulty: '中级'
        }
    };
    
    const conceptData = concepts[concept];
    const isLearned = learningProgress.completedConcepts.includes(concept);
    
    document.querySelector('.container').innerHTML = `
        <h2>${conceptData.title}</h2>
        <div class="concept-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3>${concept}概念</h3>
                <div>
                    <span style="background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 15px; font-size: 14px; margin-right: 10px;">
                        ${conceptData.difficulty}
                    </span>
                    ${isLearned ? '<span style="background: #d4edda; color: #155724; padding: 4px 12px; border-radius: 15px; font-size: 14px;">✅ 已学习</span>' : ''}
                </div>
            </div>
            <div>${conceptData.content}</div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                ${isLearned ? 
                    '<button style="background: #28a745;" disabled>✅ 已学习</button>' : 
                    `<button onclick="markAsLearned('${concept}')" style="background: #17a2b8;">📝 标记已学</button>`
                }
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')">📚 返回主页</button>
            </div>
        </div>
    `;
}
    
    const conceptData = concepts[concept];
    const isLearned = learningProgress.completedConcepts.includes(concept);
    
    document.querySelector('.container').innerHTML = `
        <h2>${conceptData.title}</h2>
        <div class="concept-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3>${concept}概念</h3>
                <div>
                    <span style="background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 15px; font-size: 14px; margin-right: 10px;">
                        ${conceptData.difficulty}
                    </span>
                    ${isLearned ? '<span style="background: #d4edda; color: #155724; padding: 4px 12px; border-radius: 15px; font-size: 14px;">✅ 已学习</span>' : ''}
                </div>
            </div>
            <p>${conceptData.content}</p>
            <div style="display: flex; gap: 10px;">
                ${isLearned ? 
                    '<button style="background: #28a745;" disabled>✅ 已学习</button>' : 
                    `<button onclick="markAsLearned('${concept}')" style="background: #17a2b8;">📝 标记已学</button>`
                }
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')">📚 返回主页</button>
            </div>
        </div>
    `;


function markAsLearned(concept) {
    console.log('标记已学函数被调用，概念:', concept); // 调试信息
    
    if (!learningProgress.completedConcepts.includes(concept)) {
        learningProgress.completedConcepts.push(concept);
        
        // 显示成功提示
        alert(`✅ 太棒了！你已经掌握了"${concept}"的知识！`);
        
        // 立即保存进度
        localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
        
        // 更新界面显示
        showConcept(concept);
        
    } else {
        alert(`ℹ️ "${concept}" 已经标记为已学习了！`);
    }
    
    console.log('当前学习进度:', learningProgress); // 调试信息
}

function showQuiz() {
    currentQuestion = 1;
    showQuestion(currentQuestion);
}

function showQuestion(questionNum) {
    const questions = {
        1: {
            question: "哪种投资方式最安全？",
            options: [
                "A. 银行一年定期存款",
                "B. 10年期国债", 
                "C. 沪深300指数基金",
                "D. 企业债券"
            ],
            correct: "A",
            explanation: "银行存款有存款保险保障，是最安全的投资方式。"
        },
        2: {
            question: "关于国债投资，以下说法正确的是？",
            options: [
                "A. 国债可以随时买卖没有风险",
                "B. 持有国债到期可以避免价格波动风险",
                "C. 所有国债收益率都一样",
                "D. 国债收益率比股票基金高"
            ],
            correct: "B",
            explanation: "持有国债到期可以确保获得本金和约定利息，避免市场价格波动风险。"
        },
        3: {
            question: "沪深300指数基金的主要特点是什么？",
            options: [
                "A. 只投资银行股",
                "B. 跟踪300家大型公司表现",
                "C. 保证每年10%收益",
                "D. 只适合短期投资"
            ],
            correct: "B", 
            explanation: "沪深300指数基金跟踪沪深两市300家规模大、流动性好的公司股票表现。"
        },
        4: {
            question: "如果通货膨胀率是3%，而银行存款利率是1%，你的钱会怎样？",
            options: [
                "A. 实际购买力增加4%",
                "B. 实际购买力增加2%",
                "C. 实际购买力减少2%", 
                "D. 实际购买力不变"
            ],
            correct: "C",
            explanation: "实际收益 = 名义收益 - 通货膨胀率 = 1% - 3% = -2%，购买力下降。"
        },
        5: {
            question: "下列哪种资金最适合投资股票基金？",
            options: [
                "A. 下个月要交的房租",
                "B. 3个月后要用的学费",
                "C. 1年后要买的手机",
                "D. 5年后才需要的购房首付"
            ],
            correct: "D",
            explanation: "股票基金适合长期投资，5年时间可以平滑市场短期波动风险。"
        },
        6: {
            question: "关于投资分散化，以下说法正确的是？",
            options: [
                "A. 把所有钱投到收益最高的产品",
                "B. 投资10个不同的P2P平台",
                "C. 配置存款、国债、基金等不同产品",
                "D. 只投资自己熟悉的公司股票"
            ],
            correct: "C",
            explanation: "真正的分散化是配置不同类型、不同风险等级的投资产品。"
        },
        7: {
            question: "银行存款的主要优点是什么？",
            options: [
                "A. 收益率最高",
                "B. 流动性差",
                "C. 安全性高",
                "D. 适合长期增值"
            ],
            correct: "C",
            explanation: "银行存款最大的优点是安全性高，有存款保险保障。"
        },
        8: {
            question: "当市场利率上升时，通常会发生什么？",
            options: [
                "A. 债券价格上升",
                "B. 股票价格一定上涨",
                "C. 已发行债券价格下降",
                "D. 银行存款利率下降"
            ],
            correct: "C",
            explanation: "市场利率上升时，已发行的固定利率债券吸引力下降，价格会下跌。"
        },
         // 新增经济周期相关题目
        9: {
            question: "在衰退期，以下哪种资产配置最合理？",
            options: [
                "A. 股票50%，债券20%，存款20%，黄金10%",
                "B. 股票10%，债券40%，存款30%，黄金20%",
                "C. 股票30%，债券30%，存款20%，黄金20%",
                "D. 股票20%，债券20%，存款30%，黄金30%"
            ],
            correct: "B",
            explanation: "衰退期经济收缩，企业盈利下滑，应该重点配置安全的债券和存款，适度配置黄金避险。"
        },
        10: {
            question: "复苏期的主要经济特征是什么？",
            options: [
                "A. CPI高位运行，经济增长停滞",
                "B. CPI温和上升，企业盈利改善",
                "C. CPI下降，PMI低于50",
                "D. PPI大幅上涨，央行可能加息"
            ],
            correct: "B",
            explanation: "复苏期CPI温和上升(1-3%)，PMI>50且上升，企业盈利开始改善。"
        },
        11: {
            question: "在通胀期，为什么黄金是较好的投资选择？",
            options: [
                "A. 黄金收益率总是最高的",
                "B. 黄金有固定的利息收入",
                "C. 黄金具有良好的抗通胀属性",
                "D. 黄金价格不会波动"
            ],
            correct: "C",
            explanation: "通胀时期货币购买力下降，黄金作为实物资产能够保值，具有良好的抗通胀属性。"
        },
        12: {
            question: "滞胀期最显著的特征是什么？",
            options: [
                "A. 低通胀+高增长",
                "B. 高通胀+高增长", 
                "C. 低通胀+低增长",
                "D. 高通胀+低增长"
            ],
            correct: "D",
            explanation: "滞胀期=停滞+通货膨胀，表现为高物价水平下经济增长停滞，是最差的经济环境。"
        },
        13: {
            question: "在复苏期，应该重点配置哪类资产？",
            options: [
                "A. 重点配置黄金ETF",
                "B. 重点配置存款和国债",
                "C. 重点配置沪深300ETF",
                "D. 平均配置所有资产"
            ],
            correct: "C",
            explanation: "复苏期企业盈利快速恢复，股票表现最好，应该重点配置沪深300ETF等权益类资产。"
        },
        14: {
            question: "以下哪个指标>50表示经济处于扩张状态？",
            options: [
                "A. CPI指数",
                "B. PPI指数", 
                "C. PMI指数",
                "D. GDP增长率"
            ],
            correct: "C",
            explanation: "PMI(采购经理指数)>50表示经济扩张，<50表示经济收缩，是重要的经济先行指标。"
        },
        15: {
            question: "在通胀期，债券为什么表现较差？",
            options: [
                "A. 债券违约风险增加",
                "B. 央行可能加息导致债券价格下跌",
                "C. 债券流动性变差",
                "D. 债券收益率总是下降"
            ],
            correct: "B",
            explanation: "通胀期央行可能加息来控制通胀，利率上升会导致已发行债券价格下跌。"
        },
        16: {
            question: "经济周期投资的基本原则是什么？",
            options: [
                "A. 任何时候都满仓股票",
                "B. 根据经济周期调整资产配置",
                "C. 只投资固定收益产品",
                "D. 完全避免风险资产"
            ],
            correct: "B",
            explanation: "经济周期投资的核心是根据不同经济阶段的特点，动态调整资产配置比例。"
        }
    
    };

    const q = questions[questionNum];
    
    document.querySelector('.container').innerHTML = `
        <h2>🧠 理财知识测试</h2>
        <div class="concept-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3>问题 ${questionNum}/${totalQuestions}</h3>
                <span style="background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 15px;">
                    得分: ${calculateQuizScore()}%
                </span>
            </div>
            
            <h4 style="margin-bottom: 20px; line-height: 1.5;">${q.question}</h4>
            
            ${q.options.map(option => `
                <div class="quiz-option" onclick="checkAnswer(${questionNum}, '${option.charAt(0)}', '${q.correct}')">
                    ${option}
                </div>
            `).join('')}
            
            <div style="display: flex; justify-content: space-between; margin-top: 25px;">
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')" style="width: auto;">📚 返回主页</button>
                ${questionNum < totalQuestions ? 
                    `<button onclick="nextQuestion()" style="width: auto; background: #28a745;">下一题 ➡️</button>` : 
                    `<button onclick="showQuizResult()" style="width: auto; background: #ffc107;">查看结果 📊</button>`
                }
            </div>
        </div>
    `;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion(currentQuestion);
}

function checkAnswer(questionNum, userAnswer, correctAnswer) {
    const questions = {
        1: { correct: "A", explanation: "银行存款有存款保险保障，是最安全的投资方式。" },
        2: { correct: "B", explanation: "持有国债到期可以确保获得本金和约定利息，避免市场价格波动风险。" },
        3: { correct: "B", explanation: "沪深300指数基金跟踪沪深两市300家规模大、流动性好的公司股票表现。" },
        4: { correct: "C", explanation: "实际收益 = 名义收益 - 通货膨胀率 = 1% - 3% = -2%，购买力下降。" },
        5: { correct: "D", explanation: "股票基金适合长期投资，5年时间可以平滑市场短期波动风险。" },
        6: { correct: "C", explanation: "真正的分散化是配置不同类型、不同风险等级的投资产品。" },
        7: { correct: "C", explanation: "银行存款最大的优点是安全性高，有存款保险保障。" },
        8: { correct: "C", explanation: "市场利率上升时，已发行的固定利率债券吸引力下降，价格会下跌。" },
        // 新增经济周期题目答案
        9: { correct: "B", explanation: "衰退期经济收缩，企业盈利下滑，应该重点配置安全的债券和存款，适度配置黄金避险。" },
        10: { correct: "B", explanation: "复苏期CPI温和上升(1-3%)，PMI>50且上升，企业盈利开始改善。" },
        11: { correct: "C", explanation: "通胀时期货币购买力下降，黄金作为实物资产能够保值，具有良好的抗通胀属性。" },
        12: { correct: "D", explanation: "滞胀期=停滞+通货膨胀，表现为高物价水平下经济增长停滞，是最差的经济环境。" },
        13: { correct: "C", explanation: "复苏期企业盈利快速恢复，股票表现最好，应该重点配置沪深300ETF等权益类资产。" },
        14: { correct: "C", explanation: "PMI(采购经理指数)>50表示经济扩张，<50表示经济收缩，是重要的经济先行指标。" },
        15: { correct: "B", explanation: "通胀期央行可能加息来控制通胀，利率上升会导致已发行债券价格下跌。" },
        16: { correct: "B", explanation: "经济周期投资的核心是根据不同经济阶段的特点，动态调整资产配置比例。" }
    };
    
    const isCorrect = userAnswer === correctAnswer;
    const q = questions[questionNum];
    
    // 更新选项样式
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        const optionLetter = option.textContent.charAt(0);
        if (optionLetter === correctAnswer) {
            option.classList.add('correct');
        } else if (optionLetter === userAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        // 记录正确答案
        learningProgress.quizScores[questionNum] = 100;
        setTimeout(() => {
            alert(`✅ 回答正确！\n\n${q.explanation}`);
        }, 500);
    } else {
        learningProgress.quizScores[questionNum] = 0;
        setTimeout(() => {
            alert(`❌ 回答错误！\n\n正确答案是：${correctAnswer}\n${q.explanation}`);
        }, 500);
    }
    
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    
    // 1.5秒后自动下一题或显示结果
    setTimeout(() => {
        if (questionNum < totalQuestions) {
            nextQuestion();
        } else {
            showQuizResult();
        }
    }, 1500);
}

function calculateQuizScore() {
    const scores = Object.values(learningProgress.quizScores).filter(score => score !== undefined);
    if (scores.length === 0) return 0;
    
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const currentCount = scores.length;
    
    // 计算已答题目的平均分
    return Math.round(totalScore / currentCount);
}

function showQuizResult() {
    const completedScores = Object.values(learningProgress.quizScores).filter(score => score !== undefined);
    const totalScore = completedScores.reduce((a, b) => a + b, 0);
    const score = Math.round(totalScore / completedScores.length);
    const correctCount = completedScores.filter(s => s === 100).length;
    
    let rating, advice, emoji;
    if (score >= 90) {
        rating = "理财专家";
        advice = "你对理财知识和经济周期投资有深刻理解！可以尝试更复杂的投资策略。";
        emoji = "🏆";
    } else if (score >= 75) {
        rating = "理财高手"; 
        advice = "基础概念和经济周期知识掌握得很好！继续学习可以成为投资达人。";
        emoji = "🎯";
    } else if (score >= 60) {
        rating = "理财学习者";
        advice = "已经掌握了基础知识，经济周期概念需要更多练习！";
        emoji = "👍";
    } else {
        rating = "理财新人";
        advice = "理财知识需要慢慢积累，建议重点学习'经济周期'和'基金进阶'内容！";
        emoji = "💪";
    }
    
    document.querySelector('.container').innerHTML = `
        <h2>📊 测试结果</h2>
        <div class="concept-card">
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 3em; margin-bottom: 10px;">
                    ${emoji}
                </div>
                <h3>${rating}</h3>
                <p style="font-size: 1.2em; color: #4a6491; margin: 10px 0;">
                    最终得分: <strong>${score}分</strong>
                </p>
                <p>答对 ${correctCount}/${completedScores.length} 题</p>
            </div>
            
            <!-- 知识点分析 -->
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>📚 知识点掌握情况</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    <div style="text-align: center;">
                        <strong>基础理财</strong><br>
                        <small>1-8题</small><br>
                        <span style="color: ${calculateSectionScore(1, 8) >= 70 ? '#28a745' : '#dc3545'};">
                            ${calculateSectionScore(1, 8)}%
                        </span>
                    </div>
                    <div style="text-align: center;">
                        <strong>经济周期</strong><br>
                        <small>9-16题</small><br>
                        <span style="color: ${calculateSectionScore(9, 16) >= 70 ? '#28a745' : '#dc3545'};">
                            ${calculateSectionScore(9, 16)}%
                        </span>
                    </div>
                </div>
            </div>
            
            <div style="background: ${score >= 70 ? '#d4edda' : score >= 60 ? '#fff3cd' : '#f8d7da'}; 
                        padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>学习建议</h4>
                <p>${advice}</p>
                ${calculateSectionScore(9, 16) < 70 ? 
                    '<p>💡 建议重点学习"经济周期"内容，理解不同周期下的资产配置。</p>' : ''}
                ${calculateSectionScore(1, 8) < 70 ? 
                    '<p>💡 建议复习基础理财概念，打好投资基础。</p>' : ''}
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="showQuiz()" style="width: auto;">🔄 重新测试</button>
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')" style="width: auto;">📚 返回主页</button>
                ${score < 75 ? '<button onclick="reviewWrongQuestions()" style="width: auto; background: #17a2b8;">📖 复习错题</button>' : ''}
                ${calculateSectionScore(9, 16) < 70 ? '<button onclick="showConcept(\'经济周期\')" style="width: auto; background: #6f42c1;">🔄 学习经济周期</button>' : ''}
            </div>
        </div>
    `;
}

// 新增：计算章节得分
function calculateSectionScore(startQ, endQ) {
    let totalScore = 0;
    let questionCount = 0;
    
    for (let i = startQ; i <= endQ; i++) {
        if (learningProgress.quizScores[i] !== undefined) {
            totalScore += learningProgress.quizScores[i];
            questionCount++;
        }
    }
    
    if (questionCount === 0) return 0;
    return Math.round(totalScore / questionCount);
}

// 新增复习错题功能
function reviewWrongQuestions() {
    const wrongQuestions = [];
    for (let i = 1; i <= totalQuestions; i++) {
        if (learningProgress.quizScores[i] === 0) {
            wrongQuestions.push(i);
        }
    }
    
    if (wrongQuestions.length === 0) {
        alert('🎉 恭喜！没有需要复习的错题。');
        return;
    }
    
    document.querySelector('.container').innerHTML = `
        <h2>📖 错题复习</h2>
        <div class="concept-card">
            <h3>需要复习的题目</h3>
            <p>以下是您答错的题目，建议重点学习：</p>
            
            <div style="margin: 20px 0;">
                ${wrongQuestions.map(qNum => `
                    <div style="background: #fff3cd; padding: 15px; margin: 10px 0; border-radius: 8px;">
                        <strong>问题 ${qNum}:</strong>
                        <button onclick="showQuestion(${qNum})" style="margin-left: 10px; padding: 5px 10px; font-size: 12px;">
                            查看题目
                        </button>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="showQuizResult()" style="width: auto;">← 返回结果</button>
        </div>
    `;
}

function showSimulation() {
    // 每次进入模拟页面时随机选择经济周期
    const economicCycles = [
        { name: '衰退期', color: '#ffebee', emoji: '📉', description: '经济收缩，企业盈利下滑' },
        { name: '复苏期', color: '#e8f5e8', emoji: '📈', description: '经济回暖，企业盈利改善' },
        { name: '通胀期', color: '#fff3cd', emoji: '💰', description: '物价上涨，央行可能加息' },
        { name: '滞胀期', color: '#f3e5f5', emoji: '⚡', description: '经济停滞+通货膨胀' }
    ];
    
    currentEconomicCycle = economicCycles[Math.floor(Math.random() * economicCycles.length)];
    simulationAttempts = 0;

    document.querySelector('.container').innerHTML = `
        <h2>💹 投资模拟</h2>
        <div class="concept-card">
            <!-- 经济周期提示 -->
            <div style="background: ${currentEconomicCycle.color}; padding: 20px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
                <div style="font-size: 2em; margin-bottom: 10px;">${currentEconomicCycle.emoji}</div>
                <h3>当前经济环境：${currentEconomicCycle.name}</h3>
                <p>${currentEconomicCycle.description}</p>
                <button onclick="showCycleAdvice()" style="background: #6f42c1; margin-top: 10px;">
                    💡 查看投资建议
                </button>
            </div>

            <h3>资产配置</h3>
            <p>你有 <strong style="color: #28a745; font-size: 1.2em;">10,000元</strong> 虚拟资金</p>
            <p>请根据当前经济周期分配资金：</p>
            
            <div style="margin: 25px 0;">
                <div class="investment-option">
                    <label>💰 银行存款 (0.95%)</label>
                    <input type="number" id="savingAmount" value="2500" min="0" max="10000" 
                           onchange="updateInvestmentTotal()" style="width: 120px;">
                    <span>元</span>
                </div>
                
                <div class="investment-option">
                    <label>📄 10年期国债 (1.90%)</label>
                    <input type="number" id="bondAmount" value="2500" min="0" max="10000"
                           onchange="updateInvestmentTotal()" style="width: 120px;">
                    <span>元</span>
                </div>
                
                <div class="investment-option">
                    <label>📈 沪深300ETF (浮动收益)</label>
                    <input type="number" id="fundAmount" value="2500" min="0" max="10000"
                           onchange="updateInvestmentTotal()" style="width: 120px;">
                    <span>元</span>
                </div>
                
                <div class="investment-option">
                    <label>🟡 黄金ETF 518880 (浮动收益)</label>
                    <input type="number" id="goldAmount" value="2500" min="0" max="10000"
                           onchange="updateInvestmentTotal()" style="width: 120px;">
                    <span>元</span>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p>已分配: <span id="allocatedTotal">10000</span> 元 / 10,000元</p>
                <p>剩余: <span id="remainingAmount">0</span> 元</p>
                <div class="progress-bar">
                    <div class="progress" id="allocationProgress" style="width: 100%"></div>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="runSimulation()" style="background: #28a745;">🚀 开始模拟</button>
                <button onclick="showCycleAdvice()" style="background: #17a2b8;">💡 投资建议</button>
                <button onclick="resetAllocation()" style="background: #6c757d;">🔄 重置分配</button>
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')">📚 返回主页</button>
            </div>
        </div>
    `;
}

// 显示经济周期投资建议
function showCycleAdvice() {
    const cycleAdvice = {
        '衰退期': {
            recommendation: '建议重点配置债券和存款，适度配置黄金',
            allocation: '债券(40%) > 存款(30%) > 黄金(20%) > 股票(10%)',
            reasoning: '经济下行时，资金寻求安全资产，债券表现最好'
        },
        '复苏期': {
            recommendation: '建议重点配置股票，适度配置债券',
            allocation: '股票(50%) > 债券(25%) > 存款(15%) > 黄金(10%)',
            reasoning: '经济复苏时，企业盈利改善，股票表现突出'
        },
        '通胀期': {
            recommendation: '建议重点配置黄金和抗通胀资产',
            allocation: '黄金(35%) > 股票(30%) > 存款(25%) > 债券(10%)',
            reasoning: '通胀时期，黄金是最好的抗通胀工具'
        },
        '滞胀期': {
            recommendation: '建议重点配置黄金，减少股票配置',
            allocation: '黄金(40%) > 存款(30%) > 债券(20%) > 股票(10%)',
            reasoning: '滞胀是最差的经济环境，黄金是唯一亮点'
        }
    };

    const advice = cycleAdvice[currentEconomicCycle.name];
    
    document.querySelector('.container').innerHTML = `
        <h2>💡 ${currentEconomicCycle.emoji} ${currentEconomicCycle.name}投资建议</h2>
        <div class="concept-card">
            <div style="background: ${currentEconomicCycle.color}; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3>${currentEconomicCycle.name}特征</h3>
                <p>${currentEconomicCycle.description}</p>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                <h4>🎯 投资建议</h4>
                <p><strong>${advice.recommendation}</strong></p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                <h4>📊 建议配置比例</h4>
                <p><strong>${advice.allocation}</strong></p>
                <p><small>${advice.reasoning}</small></p>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 15px 0;">
                <h4>📈 预期收益对比</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    <div style="text-align: center;">
                        <strong>均衡配置</strong><br>
                        <small>各25%</small><br>
                        <span style="color: #6c757d;">收益一般</span>
                    </div>
                    <div style="text-align: center;">
                        <strong>周期配置</strong><br>
                        <small>按建议比例</small><br>
                        <span style="color: #28a745;">收益更优</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">
                <button onclick="applyRecommendedAllocation()" style="background: #28a745;">✅ 应用建议配置</button>
                <button onclick="showSimulation()">← 返回模拟</button>
            </div>
        </div>
    `;
}

// 应用建议配置
function applyRecommendedAllocation() {
    const recommendedAllocations = {
        '衰退期': { saving: 3000, bond: 4000, fund: 1000, gold: 2000 },
        '复苏期': { saving: 1500, bond: 2500, fund: 5000, gold: 1000 },
        '通胀期': { saving: 2500, bond: 1000, fund: 3000, gold: 3500 },
        '滞胀期': { saving: 3000, bond: 2000, fund: 1000, gold: 4000 }
    };
    
    const allocation = recommendedAllocations[currentEconomicCycle.name];
    
    document.getElementById('savingAmount').value = allocation.saving;
    document.getElementById('bondAmount').value = allocation.bond;
    document.getElementById('fundAmount').value = allocation.fund;
    document.getElementById('goldAmount').value = allocation.gold;
    
    updateInvestmentTotal();
    showSimulation();
    alert('✅ 已应用建议配置！现在点击"开始模拟"看看效果吧！');
}

// 重置分配为均衡配置
function resetAllocation() {
    document.getElementById('savingAmount').value = 2500;
    document.getElementById('bondAmount').value = 2500;
    document.getElementById('fundAmount').value = 2500;
    document.getElementById('goldAmount').value = 2500;
    updateInvestmentTotal();
    alert('🔄 已重置为均衡配置（各25%）');
}

function updateInvestmentTotal() {
    const saving = parseInt(document.getElementById('savingAmount').value) || 0;
    const bond = parseInt(document.getElementById('bondAmount').value) || 0;
    const fund = parseInt(document.getElementById('fundAmount').value) || 0;
    const gold = parseInt(document.getElementById('goldAmount').value) || 0;
    
    const total = saving + bond + fund + gold;
    const remaining = 10000 - total;
    
    document.getElementById('allocatedTotal').textContent = total;
    document.getElementById('remainingAmount').textContent = remaining;
    document.getElementById('allocationProgress').style.width = (total / 10000 * 100) + '%';
    
    const simulateBtn = document.getElementById('simulateBtn');
    if (total === 10000) {
        simulateBtn.disabled = false;
    } else {
        simulateBtn.disabled = true;
    }
}

function runSimulation() {
    const saving = parseInt(document.getElementById('savingAmount').value) || 0;
    const bond = parseInt(document.getElementById('bondAmount').value) || 0;
    const fund = parseInt(document.getElementById('fundAmount').value) || 0;
    const gold = parseInt(document.getElementById('goldAmount').value) || 0;
    
    // 随机选择经济周期
    const economicCycles = [
        { name: '衰退期', color: '#ffebee', emoji: '📉' },
        { name: '复苏期', color: '#e8f5e8', emoji: '📈' },
        { name: '通胀期', color: '#fff3cd', emoji: '💰' },
        { name: '滞胀期', color: '#f3e5f5', emoji: '⚡' }
    ];
    const currentCycle = economicCycles[Math.floor(Math.random() * economicCycles.length)];
    
    // 根据经济周期生成各类资产收益
    const fundReturnDetails = generateFundReturn(currentCycle.name);
    const goldReturn = generateGoldReturn(currentCycle.name);
    
    // 计算各项收益
    const savingReturn = saving * 0.0095; // 0.95%
    const bondReturn = bond * 0.019;      // 1.90%
    const fundReturn = fund * fundReturnDetails.totalReturn;
    const goldReturnAmount = gold * goldReturn.returnRate;
    
    const totalReturn = savingReturn + bondReturn + fundReturn + goldReturnAmount;
    const totalReturnRate = (totalReturn / 10000) * 100;
    
    // 记录模拟结果
    if (!learningProgress.simulations) {
        learningProgress.simulations = [];
    }
    learningProgress.simulations.push({
        date: new Date().toLocaleDateString(),
        allocation: { saving, bond, fund, gold },
        return: totalReturn,
        returnRate: totalReturnRate,
        economicCycle: currentCycle.name,
        fundDetails: fundReturnDetails,
        goldDetails: goldReturn
    });
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    
    showSimulationResult(saving, bond, fund, gold, savingReturn, bondReturn, fundReturn, goldReturnAmount,
                        totalReturn, totalReturnRate, currentCycle, fundReturnDetails, goldReturn);
}

// 新增黄金ETF收益生成函数
function generateGoldReturn(economicCycle) {
    const cycleGoldReturns = {
        '衰退期': { returnRate: 0.08, reason: '避险需求推动金价上涨' },     // 8%
        '复苏期': { returnRate: -0.03, reason: '风险资产更具吸引力' },     // -3%
        '通胀期': { returnRate: 0.12, reason: '抗通胀属性体现' },          // 12%
        '滞胀期': { returnRate: 0.15, reason: '最佳避险和抗通胀资产' }     // 15%
    };
    
    const baseReturn = cycleGoldReturns[economicCycle];
    // 加入小幅随机波动
    const finalReturn = baseReturn.returnRate + (Math.random() * 0.1 - 0.05);
    
    return {
        returnRate: finalReturn,
        reason: baseReturn.reason,
        displayReturn: (finalReturn * 100).toFixed(1) + '%'
    };
}
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    
    showSimulationResult(saving, bond, fund, savingReturn, bondReturn, fundReturn, 
                        totalReturn, totalReturnRate, currentCycle, fundReturnDetails);


function generateFundReturn(economicCycle) {
    // 不同经济周期下的收益组成
    const cycleParams = {
        '衰退期': {
            dividend: 0.035,  // 股息率 3.5%
            epsGrowth: -0.15, // EPS增长 -15%
            peChange: -0.10   // PE变化 -10%
        },
        '复苏期': {
            dividend: 0.025,  // 股息率 2.5%
            epsGrowth: 0.20,  // EPS增长 20%
            peChange: 0.15    // PE变化 15%
        },
        '通胀期': {
            dividend: 0.028,  // 股息率 2.8%
            epsGrowth: 0.12,  // EPS增长 12%
            peChange: -0.05   // PE变化 -5%
        },
        '滞胀期': {
            dividend: 0.038,  // 股息率 3.8%
            epsGrowth: 0.02,  // EPS增长 2%
            peChange: -0.12   // PE变化 -12%
        }
    };
    
    const params = cycleParams[economicCycle];
    
    // 加入小幅随机波动
    const dividend = params.dividend + (Math.random() * 0.01 - 0.005);
    const epsGrowth = params.epsGrowth + (Math.random() * 0.1 - 0.05);
    const peChange = params.peChange + (Math.random() * 0.08 - 0.04);
    
    // 计算总收益
    const totalReturn = dividend + epsGrowth + peChange;
    
    return {
        economicCycle,
        dividend,
        epsGrowth, 
        peChange,
        totalReturn,
        calculation: `总收益 = 股息率(${(dividend * 100).toFixed(1)}%) + EPS增长(${(epsGrowth * 100).toFixed(1)}%) + PE变化(${(peChange * 100).toFixed(1)}%)`
    };
}

function showSimulationResult(saving, bond, fund, gold, savingReturn, bondReturn, fundReturn, goldReturnAmount,
                            totalReturn, totalReturnRate, fundReturnDetails, goldReturn) {
    simulationAttempts++;
    const isPositive = totalReturnRate >= 0;
    
    // 计算配置比例
    const savingPercent = (saving / 10000 * 100).toFixed(0);
    const bondPercent = (bond / 10000 * 100).toFixed(0);
    const fundPercent = (fund / 10000 * 100).toFixed(0);
    const goldPercent = (gold / 10000 * 100).toFixed(0);

    document.querySelector('.container').innerHTML = `
        <h2>📈 第${simulationAttempts}次模拟结果</h2>
        <div class="concept-card">
            <!-- 经济周期标识 -->
            <div style="background: ${currentEconomicCycle.color}; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                <h3>${currentEconomicCycle.emoji} ${currentEconomicCycle.name}</h3>
                <p>${currentEconomicCycle.description}</p>
            </div>
            
            <!-- 总收益 -->
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2.5em; margin-bottom: 10px;">
                    ${isPositive ? '📈' : '📉'}
                </div>
                <h3 style="color: ${isPositive ? '#28a745' : '#dc3545'};">
                    总收益: ${totalReturn.toFixed(2)}元 (${totalReturnRate.toFixed(2)}%)
                </h3>
            </div>
            
            <!-- 配置比例 -->
            <div style="margin: 20px 0;">
                <h4>📊 你的资产配置</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin: 15px 0;">
                    <div style="text-align: center; background: #e7f3ff; padding: 10px; border-radius: 8px;">
                        <strong>存款</strong><br>${savingPercent}%
                    </div>
                    <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 8px;">
                        <strong>国债</strong><br>${bondPercent}%
                    </div>
                    <div style="text-align: center; background: #e8f5e8; padding: 10px; border-radius: 8px;">
                        <strong>股票</strong><br>${fundPercent}%
                    </div>
                    <div style="text-align: center; background: #fff3cd; padding: 10px; border-radius: 8px;">
                        <strong>黄金</strong><br>${goldPercent}%
                    </div>
                </div>
            </div>
            
            <!-- 收益明细 -->
            <div style="margin: 20px 0;">
                <h4>💰 收益明细</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
                    <div style="background: #e7f3ff; padding: 10px; border-radius: 8px;">
                        <strong>💰 银行存款</strong><br>
                        收益: ${savingReturn.toFixed(2)}元<br>
                        <small>固定收益 0.95%</small>
                    </div>
                    <div style="background: #fff3cd; padding: 10px; border-radius: 8px;">
                        <strong>📄 国债</strong><br>
                        收益: ${bondReturn.toFixed(2)}元<br>
                        <small>固定收益 1.90%</small>
                    </div>
                    <div style="background: ${fundReturn >= 0 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 8px;">
                        <strong>📈 沪深300</strong><br>
                        收益: ${fundReturn.toFixed(2)}元<br>
                        <small>${(fundReturnDetails.totalReturn * 100).toFixed(1)}% 浮动</small>
                    </div>
                    <div style="background: ${goldReturnAmount >= 0 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 8px;">
                        <strong>🟡 黄金ETF</strong><br>
                        收益: ${goldReturnAmount.toFixed(2)}元<br>
                        <small>${goldReturn.displayReturn} 浮动</small>
                    </div>
                </div>
            </div>
            
            <!-- 投资建议 -->
            <div style="background: ${isPositive ? '#d4edda' : '#f8d7da'}; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4>${isPositive ? '🎉 表现不错！' : '💡 改进建议'}</h4>
                <p>${getPerformanceFeedback(totalReturnRate, currentEconomicCycle.name)}</p>
                ${simulationAttempts === 1 ? 
                    '<p><strong>💡 小贴士：</strong>点击"再次模拟"可以调整配置，看看能否获得更好收益！</p>' : 
                    '<p><strong>📊 对比分析：</strong>与上次模拟相比，这次配置是否更优？</p>'
                }
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="showSimulation()" style="background: #28a745;">🔄 再次模拟</button>
                <button onclick="showCycleAdvice()" style="background: #17a2b8;">💡 查看建议</button>
                <button onclick="showComparison()" style="background: #6f42c1;">📊 收益对比</button>
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')">📚 返回主页</button>
            </div>
        </div>
    `;
}

// 获取表现反馈
function getPerformanceFeedback(returnRate, cycle) {
    const goodThresholds = {
        '衰退期': 2,    // 衰退期能获得正收益就不错
        '复苏期': 8,    // 复苏期应该获得较高收益
        '通胀期': 5,    // 通胀期收益适中
        '滞胀期': 3     // 滞胀期能保本就不错
    };
    
    const threshold = goodThresholds[cycle];
    
    if (returnRate >= threshold) {
        return `在当前${cycle}环境下，你的投资组合表现优秀！配置很合理。`;
    } else if (returnRate >= 0) {
        return `在当前${cycle}环境下，收益尚可。尝试按照投资建议调整配置，可能会有更好表现。`;
    } else {
        return `在当前${cycle}环境下，投资出现亏损。建议学习经济周期知识，优化资产配置。`;
    }
}

// 显示收益对比（简单版本）
function showComparison() {
    alert('📊 收益对比功能开发中...\n\n多次模拟后，你可以比较不同配置在相同经济周期下的收益差异，找到最优策略！');
}

function getCycleInsight(cycle) {
    const insights = {
        '衰退期': '企业盈利下滑，但股息率较高，估值较低，适合长期布局',
        '复苏期': '企业盈利快速恢复，估值提升，是投资的好时机', 
        '通胀期': '企业盈利增长但估值受压，需要谨慎选择',
        '滞胀期': '企业盈利停滞，估值收缩，投资难度较大'
    };
    return insights[cycle];
}

function showInvestmentTips() {
    document.querySelector('.container').innerHTML = `
        <h2>💡 投资小贴士</h2>
        <div class="concept-card">
            <h3>理财基本原则</h3>
            
            <div style="margin: 20px 0;">
                <h4>💰 资产配置</h4>
                <p>不要把所有的鸡蛋放在一个篮子里！合理的资产配置可以降低风险。</p>
                
                <h4>⏰ 长期投资</h4>
                <p>市场短期会波动，但长期趋势向上。耐心是投资的朋友。</p>
                
                <h4>📊 风险匹配</h4>
                <p>选择与自己风险承受能力相匹配的投资产品。</p>
                
                <h4>🎯 目标明确</h4>
                <p>根据资金用途（短期、中期、长期）选择合适的投资方式。</p>
            </div>
            
            <button onclick="showSimulation()" style="width: auto;">← 返回模拟</button>
        </div>
    `;
}

function showProgress() {
    const completedCount = learningProgress.completedConcepts.length;
    const totalConcepts = 4;
    const progressPercent = (completedCount / totalConcepts) * 100;
    
    // 计算平均分
    const completedScores = Object.values(learningProgress.quizScores).filter(score => score !== undefined);
    const avgScore = completedScores.length > 0 ? 
        (completedScores.reduce((a, b) => a + b, 0) / completedScores.length).toFixed(1) : 0;
    
    document.querySelector('.container').innerHTML = `
        <h2>📊 学习进度</h2>
        <div class="concept-card">
            <h3>你的学习成果</h3>
            
            <div style="margin: 20px 0;">
                <h4>总体进度</h4>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercent}%"></div>
                </div>
                <p style="text-align: center; font-size: 18px; font-weight: bold; color: #4a6491;">
                    ${completedCount}/${totalConcepts} 个概念 (${progressPercent}%)
                </p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>📚 已学习的概念：</h4>
                <ul style="margin: 10px 0 20px 20px;">
                    ${learningProgress.completedConcepts.map(concept => 
                        `<li style="margin: 8px 0;">✅ ${concept}</li>`
                    ).join('') || '<li style="color: #6c757d;">暂无已学习的概念，快去学习吧！</li>'}
                </ul>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🧠 测试成绩：</h4>
                <p>已完成测试：<strong>${completedScores.length}</strong> 次</p>
                <p>平均得分：<strong>${avgScore}</strong> 分</p>
                ${completedScores.length > 0 ? 
                    `<p>最好成绩：<strong>${Math.max(...completedScores)}</strong> 分</p>` : 
                    ''
                }
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="resetProgress()" style="background: #dc3545;">🔄 重置进度</button>
                <button onclick="showMainMenu(localStorage.getItem('studentName') || '同学')">📚 返回主页</button>
            </div>
        </div>
    `;
}

// 重置学习进度
function resetProgress() {
    if (confirm('确定要重置所有学习进度吗？这将清除所有已学习的概念和测试成绩。')) {
        learningProgress = {
            completedConcepts: [],
            quizScores: [],
            totalStudyTime: 0
        };
        localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
        alert('✅ 学习进度已重置！');
        showProgress(); // 刷新进度页面
    }
}

// 页面加载时初始化
window.addEventListener('load', function() {
    initProgress();
    console.log('页面加载完成，学习进度:', learningProgress); // 调试信息
});

// 页面关闭前保存进度
window.addEventListener('beforeunload', function() {
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));

});

