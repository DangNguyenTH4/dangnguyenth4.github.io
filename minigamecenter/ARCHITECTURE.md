# 🏗️ Flappy Bird 3D - Kiến trúc & Luồng Code

Tài liệu này mô tả chi tiết kiến trúc và luồng hoạt động của game Flappy Bird 3D.

## 📊 Sơ đồ Luồng Game (Game Flow)

```mermaid
flowchart TD
    Start([Khởi động Game]) --> Init[Khởi tạo Scene Three.js]
    Init --> LoadScore[Tải High Score từ localStorage]
    LoadScore --> Ready[READY State]
    
    Ready --> WaitInput{Chờ input<br/>Space/Click/Touch}
    WaitInput -->|Nhận input| StartGame[Bắt đầu game]
    
    StartGame --> ResetPos[Reset vị trí Bird]
    StartGame --> ClearPipes[Xóa tất cả Pipes]
    StartGame --> ResetVars[Reset score và speed]
    
    ResetPos --> Playing[PLAYING State]
    ClearPipes --> Playing
    ResetVars --> Playing
    
    Playing --> Loop{Game Loop<br/>requestAnimationFrame}
    
    Loop --> Physics[Update Physics]
    Physics --> ApplyGravity[Áp dụng trọng lực]
    ApplyGravity --> UpdateVelocity[Cập nhật velocity]
    UpdateVelocity --> UpdatePosition[Cập nhật vị trí Bird]
    UpdatePosition --> UpdateRotation[Cập nhật góc xoay Bird]
    UpdateRotation --> WingFlap[Animation vỗ cánh]
    
    Loop --> Pipes[Update Pipes]
    Pipes --> MovePipes[Di chuyển Pipes sang trái]
    MovePipes --> SpawnCheck{Cần spawn<br/>Pipe mới?}
    SpawnCheck -->|Có| SpawnPipe[Tạo Pipe với gap ngẫu nhiên]
    SpawnCheck -->|Không| RemoveCheck{Pipe ngoài<br/>màn hình?}
    SpawnPipe --> RemoveCheck
    RemoveCheck -->|Có| RemovePipe[Xóa Pipe]
    RemoveCheck -->|Không| ScoreCheck{Bird vượt<br/>qua Pipe?}
    RemovePipe --> ScoreCheck
    ScoreCheck -->|Có| IncreaseScore[Tăng score]
    IncreaseScore --> IncreaseDifficulty[Tăng speed, giảm gap]
    IncreaseDifficulty --> Collision
    ScoreCheck -->|Không| Collision
    
    WingFlap --> Collision[Check Collision]
    
    Collision --> BoundCheck{Va chạm<br/>biên trên/dưới?}
    BoundCheck -->|Có| GameOver[GAME_OVER State]
    BoundCheck -->|Không| PipeCollision{Va chạm<br/>Pipe?}
    PipeCollision -->|Có| GameOver
    PipeCollision -->|Không| Render[Render Scene]
    
    Render --> Loop
    
    GameOver --> ScreenShake[Hiệu ứng rung màn hình]
    ScreenShake --> SaveHighScore{Score > High Score?}
    SaveHighScore -->|Có| UpdateStorage[Lưu vào localStorage]
    SaveHighScore -->|Không| ShowGameOver[Hiển thị Game Over Screen]
    UpdateStorage --> ShowGameOver
    
    ShowGameOver --> WaitRestart{Chờ input<br/>để restart}
    WaitRestart -->|Nhận input| Ready
    
    Playing --> JumpInput{Input trong<br/>khi chơi?}
    JumpInput -->|Có| ApplyJump[Áp dụng Jump Velocity]
    ApplyJump --> Physics

    style Start fill:#e1f5ff
    style Playing fill:#c8e6c9
    style GameOver fill:#ffcdd2
    style Ready fill:#fff9c4
    style Loop fill:#b3e5fc
```

## 🔄 Sơ đồ Máy trạng thái (State Machine)

```mermaid
stateDiagram-v2
    [*] --> READY: Game khởi động
    
    READY --> PLAYING: Space/Click/Touch
    READY: Hiển thị title screen<br/>Chờ input để bắt đầu<br/>Bird đứng yên
    
    PLAYING --> GAME_OVER: Collision
    PLAYING: Physics active<br/>Pipes di chuyển<br/>Score tăng<br/>Input = Jump
    
    GAME_OVER --> READY: Space/Click/Touch
    GAME_OVER: Hiển thị score<br/>Lưu high score<br/>Screen shake effect
    
    PLAYING --> PLAYING: Jump input
```

## 🧩 Sơ đồ Components (Component Diagram)

```mermaid
graph TB
    subgraph HTML["HTML Structure"]
        Canvas[Canvas Element]
        UI[UI Overlay]
        ScoreUI[Score Display]
        ReadyScreen[Ready Screen]
        GameOverScreen[Game Over Screen]
    end
    
    subgraph ThreeJS["Three.js Scene"]
        Scene[Scene]
        Camera[Orthographic Camera]
        Renderer[WebGL Renderer]
        
        subgraph Lighting["Lighting"]
            AmbientLight[Ambient Light]
            DirectionalLight[Directional Light]
            BackLight[Back Light]
        end
        
        subgraph Objects["3D Objects"]
            Bird[Bird Group]
            BirdBody[Body Sphere]
            Wings[Wings]
            Beak[Beak Cone]
            Eyes[Eyes]
            
            PipeArray[Pipes Array]
            Pipe1[Pipe Group]
            TopPipe[Top Pipe]
            BottomPipe[Bottom Pipe]
            Caps[Pipe Caps]
        end
    end
    
    subgraph GameLogic["Game Logic"]
        StateManager[State Manager]
        PhysicsEngine[Physics Engine]
        CollisionDetector[Collision Detector]
        ScoreManager[Score Manager]
        DifficultyScaler[Difficulty Scaler]
    end
    
    subgraph Input["Input System"]
        KeyboardHandler[Keyboard Handler]
        MouseHandler[Mouse Handler]
        TouchHandler[Touch Handler]
        UnifiedJump[jump Function]
    end
    
    subgraph Storage["Data Persistence"]
        LocalStorage[(localStorage)]
    end
    
    Canvas --> Renderer
    Renderer --> Scene
    Scene --> Camera
    Scene --> Lighting
    Scene --> Objects
    
    Bird --> BirdBody
    Bird --> Wings
    Bird --> Beak
    Bird --> Eyes
    
    PipeArray --> Pipe1
    Pipe1 --> TopPipe
    Pipe1 --> BottomPipe
    Pipe1 --> Caps
    
    KeyboardHandler --> UnifiedJump
    MouseHandler --> UnifiedJump
    TouchHandler --> UnifiedJump
    UnifiedJump --> StateManager
    
    StateManager --> PhysicsEngine
    StateManager --> CollisionDetector
    StateManager --> ScoreManager
    
    PhysicsEngine --> Bird
    CollisionDetector --> Bird
    CollisionDetector --> PipeArray
    
    ScoreManager --> DifficultyScaler
    ScoreManager --> UI
    ScoreManager --> LocalStorage
    
    DifficultyScaler --> PhysicsEngine
```

## 🎯 Luồng Xử lý Physics (Physics Pipeline)

```mermaid
flowchart LR
    Input[User Input] --> Jump[Set velocity = JUMP_VELOCITY]
    Jump --> Frame[Animation Frame]
    
    Frame --> Delta[Calculate deltaTime]
    Delta --> Gravity[velocity -= GRAVITY * deltaTime]
    Gravity --> Clamp[Clamp velocity<br/>MIN to MAX]
    Clamp --> Position[position.y += velocity * deltaTime]
    Position --> Rotation[Calculate target rotation<br/>based on velocity]
    Rotation --> Lerp[Smooth rotation<br/>using lerp]
    Lerp --> Apply[Apply to Bird mesh]
    Apply --> NextFrame[Next Frame]
    NextFrame --> Frame
    
    style Input fill:#bbdefb
    style Jump fill:#c5e1a5
    style Frame fill:#fff9c4
    style Apply fill:#ffccbc
```

## 🎮 Luồng Quản lý Pipes (Pipe Management)

```mermaid
flowchart TD
    Start([Update Pipes]) --> Move[Di chuyển tất cả pipes<br/>position.x -= speed * deltaTime]
    
    Move --> CalcRight[Tính rightmostPipe position]
    CalcRight --> CheckSpawn{rightmostPipe < nextSpawnX?}
    
    CheckSpawn -->|Có| RandomGap[Tạo random gap Y position]
    RandomGap --> CreatePipe[Tạo Pipe mới tại nextSpawnX + 6]
    CreatePipe --> UpdateNext[nextSpawnX = newPipeX + SPAWN_DISTANCE]
    UpdateNext --> CheckRemove
    
    CheckSpawn -->|Không| CheckRemove[Duyệt qua tất cả pipes]
    
    CheckRemove --> OffScreen{Pipe.x < -8?}
    OffScreen -->|Có| Remove[Xóa khỏi scene và array]
    OffScreen -->|Không| CheckScore{Bird vượt qua?}
    
    Remove --> CheckScore
    CheckScore -->|Có & chưa scored| Score[scored = true<br/>score++<br/>updateDifficulty]
    CheckScore -->|Không| Next{Còn pipe nào?}
    Score --> Next
    Next -->|Có| CheckRemove
    Next -->|Không| End([Kết thúc Update])
    
    style CreatePipe fill:#c8e6c9
    style Remove fill:#ffcdd2
    style Score fill:#fff9c4
```

## 🎨 Luồng Render (Render Pipeline)

```mermaid
flowchart LR
    RAF[requestAnimationFrame] --> CalcDelta[Tính deltaTime]
    CalcDelta --> UpdatePhysics[Update Physics]
    UpdatePhysics --> UpdatePipes[Update Pipes]
    UpdatePipes --> CheckCollisions[Check Collisions]
    CheckCollisions --> UpdateUI[Update UI Elements]
    UpdateUI --> Render[renderer.render scene, camera]
    Render --> RAF
    
    style RAF fill:#e1bee7
    style Render fill:#80deea
```

## 📦 Cấu trúc Data (Data Structure)

```mermaid
classDiagram
    class PHYSICS {
        +Number GRAVITY
        +Number JUMP_VELOCITY
        +Number MAX_FALL_SPEED
        +Number MAX_RISE_SPEED
    }
    
    class GAME_CONFIG {
        +Number PIPE_SPAWN_DISTANCE
        +Number PIPE_MOVE_SPEED
        +Number PIPE_GAP_INITIAL
        +Number PIPE_GAP_MIN
        +Number SPEED_INCREASE_RATE
        +Number GAP_DECREASE_RATE
        +Number BIRD_X_POSITION
    }
    
    class GameState {
        +currentState String
        +score Number
        +highScore Number
        +birdVelocity Number
        +birdRotation Number
        +currentSpeed Number
        +currentGap Number
        +pipes Array~Pipe~
        +nextPipeSpawnX Number
    }
    
    class Pipe {
        +mesh Group
        +scored Boolean
        +gapY Number
        +gap Number
    }
    
    class Bird {
        +position Vector3
        +rotation Vector3
        +children Array~Mesh~
    }
    
    GameState --> Pipe: contains
    GameState --> Bird: controls
    GameState --> PHYSICS: uses
    GameState --> GAME_CONFIG: uses
```

## 🔧 Các Hàm Chính (Main Functions)

| Tên Hàm | Mô tả | Input | Output |
|---------|-------|-------|--------|
| `createBird()` | Tạo 3D model của Bird | - | Bird Group |
| `createPipe(x, gapY, gap)` | Tạo cặp pipe tại vị trí x | x, gapY, gap | Pipe Object |
| `resetGame()` | Reset tất cả game state | - | void |
| `startGame()` | Bắt đầu game mới | - | void |
| `gameOver()` | Kết thúc game | - | void |
| `jump()` | Xử lý input jump | - | void |
| `updatePhysics(dt)` | Cập nhật vật lý Bird | deltaTime | void |
| `updatePipes(dt)` | Quản lý pipes | deltaTime | void |
| `checkCollisions()` | Kiểm tra va chạm | - | void |
| `updateDifficulty()` | Tăng độ khó | - | void |

## ⚡ Performance Optimizations

1. **Object Pooling**: Pipes được tạo và xóa động để tránh memory leak
2. **Delta Time**: Physics độc lập với frame rate
3. **Bounding Box Cache**: Box3 được tạo mới mỗi frame (có thể optimize thêm)
4. **Efficient Rendering**: Chỉ render những gì cần thiết
5. **Request Animation Frame**: Sử dụng RAF thay vì setInterval

---

**📌 Lưu ý**: Tài liệu này được tạo để giải thích chi tiết cách hoạt động của game cho mục đích học tập và phát triển.
