class AdvancedSystemOptimizer { 
    constructor() { 
    this.running = false; 
    this.intervalId = null; 
    this.callTypes = [ 
    {name: 'read', baseTime: 200, resource: 10}, 
    {name: 'write', baseTime: 250, resource: 15}, 
    {name: 'open', baseTime: 150, resource: 8}, 
    {name: 'close', baseTime: 100, resource: 5}, 
    {name: 'fork', baseTime: 400, resource: 25}, 
    {name: 'exec', baseTime: 350, resource: 20}, 
    {name: 'mmap', baseTime: 300, resource: 18}, 
    {name: 'munmap', baseTime: 280, resource: 16} 
    ]; 
    this.metrics = { 
    totalCalls: 0, 
    avgLatency: 0, 
    throughput: 0, 
    efficiency: 0, 
    resourceUsage: 0, 
    errorRate: 0 
    }; 
    this.history = []; 
    this.config = { 
    level: 'medium', 
    interval: 1000, 
    resourceLimit: 80 
    }; 
    this.initInterface(); 
    this.bindConfig(); 
    } 
    initInterface() { 
    const callPanel = document.getElementById('callPanel'); 
    this.callTypes.forEach(call => { 
    const btn = document.createElement('button'); 
    btn.className = 'call-btn'; 
    btn.textContent = call.name; 
    btn.onclick = () => this.executeSingleCall(call.name); 
    callPanel.appendChild(btn); 
    }); 
    this.updateMetrics(); 
    this.updateStats(); 
    } 
    bindConfig() { 
    document.getElementById('optLevel').addEventListener('change', (e) => { 
    this.config.level = e.target.value; 
    this.log(`Optimization level set to ${this.config.level}`); 
    }); 
    document.getElementById('optInterval').addEventListener('change', (e) => { 
    this.config.interval = parseInt(e.target.value); 
    if (this.running) { 
    this.stop(); 
    this.start(); 
    } 
    this.log(`Interval updated to ${this.config.interval}ms`); 
    }); 
    document.getElementById('resourceLimit').addEventListener('change', (e) => { 
    this.config.resourceLimit = parseInt(e.target.value); 
    this.log(`Resource limit set to ${this.config.resourceLimit}%`); 
    }); 
    } 
    log(message) { 
    const logPanel = document.getElementById('logPanel'); 
    logPanel.innerHTML += `[${new Date().toLocaleTimeString()}] ${message}<br>`; 
    logPanel.scrollTop = logPanel.scrollHeight; 
    } 
    updateMetrics() { 
    const metricsPanel = document.getElementById('metricsPanel'); 
    metricsPanel.innerHTML = ` 
    <div class="metric-card"> 
    <h4>Total Calls</h4> 
    <p>${this.metrics.totalCalls}</p> 
    </div> 
    <div class="metric-card"> 
    <h4>Avg Latency</h4> 
    <p>${this.metrics.avgLatency.toFixed(2)}ms</p> 
    </div> 
    <div class="metric-card"> 
    <h4>Throughput</h4> 
    <p>${this.metrics.throughput.toFixed(2)} calls/s</p> 
    </div> 
    <div class="metric-card"> 
    <h4>Efficiency</h4> 
    <p>${this.metrics.efficiency.toFixed(2)}%</p> 
    </div> 
    <div class="metric-card"> 
    <h4>Resource Usage</h4> 
    <p>${this.metrics.resourceUsage.toFixed(2)}%</p> 
    </div> 
    <div class="metric-card"> 
    <h4>Error Rate</h4> 
    <p>${this.metrics.errorRate.toFixed(2)}%</p> 
    </div> 
    `; 
    } 
    updateStats() { 
    const statsGrid = document.getElementById('statsGrid'); 
    statsGrid.innerHTML = ` 
    <div class="stat-card"> 
    <h3>Optimization Rate</h3> 
    <p>${(this.metrics.efficiency * 0.8).toFixed(2)}%</p> 
    </div> 
    <div class="stat-card"> 
    <h3>Resource Efficiency</h3> 
    <p>${(100 - this.metrics.resourceUsage).toFixed(2)}%</p> 
    </div> 
    <div class="stat-card"> 
    <h3>Call Distribution</h3> 
    <p>${this.getCallDistribution()}</p> 
    </div> 
    <div class="stat-card"> 
    <h3>System Stability</h3> 
    <p>${(100 - this.metrics.errorRate).toFixed(2)}%</p> 
    </div> 
    `; 
    } 
    getCallDistribution() { 
    const counts = this.history.reduce((acc, h) => { 
    acc[h.call] = (acc[h.call] || 0) + 1; 
    return acc; 
    }, {}); 
    return Object.entries(counts) 
    .map(([call, count]) => `${call}: ${count}`) 
    .join(', '); 
    } 
    optimizeCall(callType) { 
    const call = this.callTypes.find(c => c.name === callType); 
    const baseTime = call.baseTime * (0.8 + Math.random() * 0.4); 
    let optFactor; 
    switch(this.config.level) { 
    case 'low': optFactor = 0.7; break; 
    case 'medium': optFactor = 0.5; break; 
    case 'high': optFactor = 0.3; break; 
    } 
    const optimizedTime = baseTime * optFactor; 
    const resource = call.resource * (0.8 + Math.random() * 0.4); 
    const error = Math.random() < 0.05 ? true : false; 
    if (resource > this.config.resourceLimit) { 
    return { error: true, message: 'Resource limit exceeded' }; 
    } 
    const efficiency = ((baseTime - optimizedTime) / baseTime) * 100; 
    this.metrics.totalCalls++; 
    this.metrics.avgLatency = (this.metrics.avgLatency * (this.metrics.totalCalls - 1) + optimizedTime) / 
    this.metrics.totalCalls; 
    this.metrics.throughput = 1000 / this.metrics.avgLatency; 
    this.metrics.efficiency = (this.metrics.efficiency * (this.metrics.totalCalls - 1) + efficiency) / 
    this.metrics.totalCalls; 
    this.metrics.resourceUsage = (this.metrics.resourceUsage * (this.metrics.totalCalls - 1) + resource) / 
    this.metrics.totalCalls; 
    this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.totalCalls - 1) + (error ? 100 : 0)) / 
    this.metrics.totalCalls; 
    this.history.push({ call: callType, baseTime, optimizedTime, resource, error }); 
    return { baseTime, optimizedTime, resource, efficiency, error }; 
    } 
    executeSingleCall(callType) { 
    const result = this.optimizeCall(callType); 
    if (result.error) { 
    this.log(`ERROR: ${callType} - ${result.message}`); 
    } else { 
    this.log(`${callType}: ${result.baseTime.toFixed(2)}ms → ${result.optimizedTime.toFixed(2)}ms`); 
    this.log(`- Efficiency: ${result.efficiency.toFixed(2)}%`); 
    this.log(`- Resources: ${result.resource.toFixed(2)}%`); 
    if (result.error) this.log('- Status: FAILED'); 
    } 
    this.updateMetrics(); 
    this.updateStats(); 
    } 
    autoOptimize() { 
    if (!this.running) return; 
    const callType = this.callTypes[Math.floor(Math.random() * this.callTypes.length)].name; 
    this.executeSingleCall(callType); 
    this.intervalId = setTimeout(() => this.autoOptimize(), this.config.interval); 
    } 
    start() { 
    if (!this.running) { 
    this.running = true; 
    this.log('System optimization started'); 
    this.autoOptimize(); 
    } 
    } 
    stop() { 
    if (this.running) { 
    clearTimeout(this.intervalId); 
    this.running = false; 
    this.analyzeSystem(); 
    } 
    } 
    analyzeSystem() { 
    if (!this.history.length) { 
    this.log('No optimization data available'); 
    return; 
    } 
    const totalTimeSaved = this.history.reduce((sum, h) => sum + (h.baseTime - h.optimizedTime), 0); 
    const avgResource = this.history.reduce((sum, h) => sum + h.resource, 0) / this.history.length; 
    const errorCount = this.history.filter(h => h.error).length; 
    this.log('--- System Analysis ---'); 
    this.log(`Total time saved: ${totalTimeSaved.toFixed(2)}ms`); 
    this.log(`Average resource usage: ${avgResource.toFixed(2)}%`); 
    this.log(`Error count: ${errorCount} (${(errorCount / this.history.length * 100).toFixed(2)}%)`); 
    this.log(`Call distribution: ${this.getCallDistribution()}`); 
    } 
    clear() { 
    document.getElementById('logPanel').innerHTML = ''; 
    this.history = []; 
    this.metrics = { 
    totalCalls: 0, 
    avgLatency: 0, 
    throughput: 0, 
    efficiency: 0, 
    resourceUsage: 0, 
    errorRate: 0 
    }; 
    this.updateMetrics(); 
    this.updateStats(); 
    this.log('Logs and history cleared'); 
    } 
    } 
    const optimizer = new AdvancedSystemOptimizer(); 
    function startOptimization() { optimizer.start(); } 
    function stopOptimization() { optimizer.stop(); } 
    function analyzeSystem() { optimizer.analyzeSystem(); } 
    function clearLogs() { optimizer.clear(); } 
    function scrollToSection(sectionId) { 
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' }); 
    } 
    window.addEventListener('scroll', () => { 
    const sections = document.querySelectorAll('section'); 
    const navItems = document.querySelectorAll('.nav-item'); 
    let currentSection = ''; 
    sections.forEach(section => { 
    if (window.pageYOffset >= section.offsetTop - 60) { 
    currentSection = section.id; 
    } 
    }); 
    navItems.forEach(item => { 
    item.classList.toggle('active', item.getAttribute('href').slice(1) === currentSection); 
    }); 
    }); 
    const style = document.createElement('style'); 
    style.textContent = ` 
    .nav-item.active { 
    color: var(--secondary-color); 
    border-bottom: 2px solid var(--secondary-color); 
    padding-bottom: 0.2rem; 
    } 
    @keyframes fadeIn { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
    } 
    .feature-card, .metric-card, .stat-card { 
    animation: fadeIn 0.5s ease-out; 
    } 
    `; 
    document.head.appendChild(style); 
    document.addEventListener('DOMContentLoaded', () => { 
    const cards = document.querySelectorAll('.feature-card, .metric-card, .stat-card'); 
    cards.forEach((card, i) => { 
    card.style.animationDelay = `${i * 0.1}s`; 
    }); 
    });