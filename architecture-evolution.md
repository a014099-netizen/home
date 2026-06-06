# 系統架構演進圖

## 架構演進流程

```mermaid
graph TD
    A["🔧 單機架構"] -->|應用與數據庫分離<br/>解決資源爭搶| B["📊 應用+數據庫分離"]
    B -->|應用集群+負載均衡<br/>解決高並發| C["⚖️ 應用集群"]
    C -->|高級緩存<br/>解決查詢性能| D["💾 緩存層<br/>Redis/Memcached"]
    D -->|數據庫讀寫分離<br/>解決讀寫阻塞| E["🔄 讀寫分離"]
    E -->|分庫分表+分布式DB<br/>解決海量存儲| F["🌐 分布式數據庫"]
    F -->|反向代理<br/>解決訪問速度/安全| G["🛡️ 反向代理<br/>Nginx/HAProxy"]
    G -->|搜索引擎+NoSQL<br/>解決複雜查詢| H["🔍 搜索+NoSQL<br/>ES/MongoDB"]
    H -->|業務拆分+分布式<br/>解決業務膨脹| I["🔀 微服務架構"]
    I -->|代碼維護+微服架構<br/>解決團隊協作| J["👥 微服務治理"]
    J -->|容器化+雲平台<br/>解決運維成本| K["☁️ 雲原生架構<br/>Docker/K8s"]

    style A fill:#FFE5E5
    style B fill:#FFD4D4
    style C fill:#FFC3C3
    style D fill:#FFB2B2
    style E fill:#FFA1A1
    style F fill:#FF9090
    style G fill:#FF7F7F
    style H fill:#FF6E6E
    style I fill:#FF5D5D
    style J fill:#FF4C4C
    style K fill:#FF3B3B
```

## 分層架構圖

```mermaid
graph TB
    subgraph "用戶層"
        U["🌍 用戶請求"]
    end
    
    subgraph "網絡層"
        LB["⚖️ 負載均衡器"]
        RP["🛡️ 反向代理<br/>Nginx"]
    end
    
    subgraph "應用層"
        APP1["🔧 應用服務1"]
        APP2["🔧 應用服務2"]
        APP3["🔧 應用服務3"]
    end
    
    subgraph "緩存層"
        CACHE["💾 高級緩存<br/>Redis"]
    end
    
    subgraph "搜索層"
        ES["🔍 搜索引擎<br/>Elasticsearch"]
        NOSQL["📦 NoSQL<br/>MongoDB"]
    end
    
    subgraph "數據庫層"
        MASTER["💿 主庫<br/>寫操作"]
        SLAVE1["💿 從庫1<br/>讀操作"]
        SLAVE2["💿 從庫2<br/>讀操作"]
    end
    
    subgraph "分布式層"
        SHARD1["🌐 分片1"]
        SHARD2["🌐 分片2"]
        SHARD3["🌐 分片3"]
    end
    
    U --> LB
    LB --> RP
    RP --> APP1
    RP --> APP2
    RP --> APP3
    
    APP1 --> CACHE
    APP2 --> CACHE
    APP3 --> CACHE
    
    CACHE --> ES
    CACHE --> NOSQL
    
    APP1 --> MASTER
    APP2 --> MASTER
    APP3 --> MASTER
    
    MASTER --> SLAVE1
    MASTER --> SLAVE2
    
    MASTER --> SHARD1
    MASTER --> SHARD2
    MASTER --> SHARD3
    
    style U fill:#E3F2FD
    style LB fill:#BBDEFB
    style RP fill:#90CAF9
    style APP1 fill:#64B5F6
    style APP2 fill:#64B5F6
    style APP3 fill:#64B5F6
    style CACHE fill:#FFC107
    style ES fill:#FF9800
    style NOSQL fill:#FF9800
    style MASTER fill:#F44336
    style SLAVE1 fill:#EF5350
    style SLAVE2 fill:#EF5350
    style SHARD1 fill:#AB47BC
    style SHARD2 fill:#AB47BC
    style SHARD3 fill:#AB47BC
```

## 問題與解決方案對應表

| 問題 | 原因 | 解決方案 | 技術選型 |
|------|------|--------|--------|
| 資源爭搶 | 應用與數據庫耦合 | 應用與數據庫分離 | 物理分離 |
| 高並發 | 單機性能瓶頸 | 應用集群+負載均衡 | Nginx/HAProxy |
| 查詢性能差 | 頻繁數據庫訪問 | 高級緩存 | Redis/Memcached |
| 讀寫阻塞 | 數據庫讀寫爭搶 | 讀寫分離 | 主從複製 |
| 海量數據存儲 | 單機存儲容量 | 分庫分表+分布式DB | Sharding/MongoDB |
| 訪問速度慢 | 距離遠/安全問題 | 反向代理 | Nginx |
| 複雜查詢 | 關係型數據庫性能 | 搜索引擎+NoSQL | ES/MongoDB |
| 業務複雜臃腫 | 單體應用膨脹 | 業務拆分+分布式 | 微服務架構 |
| 團隊協作困難 | 代碼耦合度高 | 微服務治理 | Service Mesh |
| 運維成本高 | 手動部署/擴展 | 容器化+雲平台 | Docker/K8s |

## 微服務架構示意

```mermaid
graph LR
    subgraph "微服務集群"
        US["👤 用戶服務"]
        OS["📦 訂單服務"]
        PS["💳 支付服務"]
        IS["📦 庫存服務"]
    end
    
    subgraph "基礎設施"
        REG["📋 服務註冊中心<br/>Eureka/Consul"]
        CONFIG["⚙️ 配置中心<br/>Apollo/Nacos"]
        MESH["🕸️ 服務網格<br/>Istio"]
        LOG["📊 日誌中心<br/>ELK"]
    end
    
    subgraph "數據存儲"
        CACHE2["💾 分布式緩存"]
        DB2["💿 分布式數據庫"]
    end
    
    US --> REG
    OS --> REG
    PS --> REG
    IS --> REG
    
    US --> CONFIG
    OS --> CONFIG
    PS --> CONFIG
    IS --> CONFIG
    
    US --> MESH
    OS --> MESH
    PS --> MESH
    IS --> MESH
    
    US --> LOG
    OS --> LOG
    PS --> LOG
    IS --> LOG
    
    US --> CACHE2
    OS --> CACHE2
    US --> DB2
    OS --> DB2
    
    style US fill:#4CAF50
    style OS fill:#4CAF50
    style PS fill:#4CAF50
    style IS fill:#4CAF50
    style REG fill:#2196F3
    style CONFIG fill:#2196F3
    style MESH fill:#2196F3
    style LOG fill:#FF9800
    style CACHE2 fill:#FFC107
    style DB2 fill:#F44336
```

## 雲原生架構示意

```mermaid
graph TB
    subgraph "雲平台"
        K8S["☁️ Kubernetes 集群"]
        
        subgraph "容器編排"
            POD1["📦 Pod1<br/>應用容器"]
            POD2["📦 Pod2<br/>應用容器"]
            POD3["📦 Pod3<br/>應用容器"]
        end
        
        subgraph "存儲"
            PV["💾 持久化存儲<br/>PVC"]
            CM["⚙️ 配置映射<br/>ConfigMap"]
        end
        
        subgraph "網絡"
            INGRESS["🌐 入口控制器<br/>Ingress"]
            SERVICE["🔌 服務<br/>Service"]
        end
        
        subgraph "監控"
            PROM["📊 Prometheus"]
            GRAF["📈 Grafana"]
        end
    end
    
    USER["🌍 用戶"]
    USER --> INGRESS
    INGRESS --> SERVICE
    SERVICE --> POD1
    SERVICE --> POD2
    SERVICE --> POD3
    
    POD1 --> PV
    POD2 --> PV
    POD3 --> PV
    
    POD1 --> CM
    POD2 --> CM
    POD3 --> CM
    
    POD1 --> PROM
    POD2 --> PROM
    POD3 --> PROM
    
    PROM --> GRAF
    
    style K8S fill:#E1F5FE
    style POD1 fill:#81D4FA
    style POD2 fill:#81D4FA
    style POD3 fill:#81D4FA
    style PV fill:#FFB74D
    style CM fill:#FFB74D
    style INGRESS fill:#4DD0E1
    style SERVICE fill:#4DD0E1
    style PROM fill:#A1887F
    style GRAF fill:#A1887F
```

---

## 如何使用這些圖表

### 在 GitHub 中使用
- 直接將 Mermaid 代碼複製到 `.md` 文件中
- GitHub 會自動渲染為圖表

### 在演示中使用
- 可以使用 Mermaid Live Editor: https://mermaid.live
- 或者轉換為 PNG/SVG 進行展示

### 自定義配色
修改 `fill:#XXXXXX` 部分的顏色代碼即可

