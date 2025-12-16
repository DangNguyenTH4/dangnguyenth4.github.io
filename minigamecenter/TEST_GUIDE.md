# Test Guide: Flappy Bird 3D

## ✅ Testing Steps

1. **Reload trang web** trong browser của bạn:
   - Nhấn `F5` HOẶC
   - Nhấn `Ctrl + R` (Windows/Linux) hoặc `Cmd + R` (Mac)

2. **Bắt đầu game**:
   - Nhấn `Space` HOẶC
   - Click chuột HOẶC  
   - Tap màn hình (mobile)

3. **Chơi game**:
   - **NHẤN NHIỀU LẦN** `Space` hoặc Click để giữ bird bay
   - Bird sẽ rơi do trọng lực - đây là mechanics đúng
   - Mỗi lần nhấn, bird sẽ nhảy lên một chút

4. **Kiểm tra**:
   - ✅ Bird có nhảy lên khi bạn nhấn Space?
   - ✅ Bird có rơi xuống khi không nhấn?
   - ✅ Pipes có di chuyển từ phải sang trái?
   - ✅ Score có tăng khi vượt qua pipes?

## 🎮 Expected Behavior

- **Lần nhấn đầu tiên**: Game bắt đầu, bird nhảy lên
- **Các lần nhấn tiếp theo**: Bird nhảy lên mỗi lần nhấn
- **Không nhấn**: Bird rơi xuống do gravity
- **Game Over**: Khi va chạm pipe hoặc boundary

## 🐛 Nếu vẫn không hoạt động

Hãy mở **Console** (F12 → tab Console) và kiểm tra xem có lỗi nào không, sau đó báo lại cho tôi biết.

## 📊 Physics Values (Current)

```javascript
GRAVITY: 0.0015          // Trọng lực (nhẹ hơn trước)
JUMP_VELOCITY: 0.35      // Lực nhảy (mạnh hơn trước)
PIPE_MOVE_SPEED: 0.08    // Tốc độ pipe
```

Những giá trị này đã được điều chỉnh cẩn thận để tạo gameplay cân bằng!
