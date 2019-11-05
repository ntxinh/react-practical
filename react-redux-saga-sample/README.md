```
json-server db.json

npm start
```

middleware có phân biệt thứ tự

# Redux thunk
- redux-thunk dùng để xử lý side-effect và các hoạt động không đồng bộ (asynchronous)
- side-effect là những tương tác của ứng dụng với thế giới bên ngoài: giao tiếp API, đọc ghi file, analyst events
- trong redux side-effect thường được xử lý ở action (action creator) hoặc middleware
- Lưu ý: không xử lý ở reducer, vì reducer phải là pure function
- Action creator hoặc middleware đều có thể xử lý side-effect
- redux-thunk là một package. Cung cấp middleware để xử lý các hàm trả về từ action creator. Middleware và action creator làm việc cùng nhau
- Không thể kết hợp, giao tiếp giữa các side-effect

# Redux Saga
- Xử lý side-effect
- Xử lý các câu chuyện phức tạp về dữ liệu
- sử dụng tính năng ES6: generators
- Có khả năng chuyển code không đồng bộ thành đồng bộ
- Giải quyết các bài toán về xử lý song song và tuần tự
- Xử lý các quy trình dài hạn, phức tạp
- Giải quyết các bài toán về chains of promises
- Clean code
- Các side-effect có thể giao tiếp với nhau
- Phức tạp
- Tốn thời gian cho người mới
- Nặng về xử lý. Không dành cho ứng dụng đơn giản

# Generator
- Là các function, các quy trình nền, chương trình con, có khả năng tạm dừng và tiếp tục chạy, Có khả năng thoát ra khỏi hàm sau đó nhập lại vào trong hàm chạy lại. Và mỗi lần thoát ra hoặc nhập lại như vậy ta có thể lưu trữ các biến

```js
function* abc(){}
```

từ khóa `yield`:
- Trả về giá trị từ generator function. Tương đồng với từ khóa `return`
- Trì hoãn việc thực thi các đoạn code tiếp theo
- Dừng lại. Sau đó bắt đầu từ điểm kết thúc

- Generator function trả về các iterators. Là các đối tượng, xem như một chuỗi các giá trị, hỗ trợ lấy giá trị tiếp theo (yield tiếp theo) trong chuỗi bằng hàm `next`
- Kết quả bao gồm `value` trả về và `done` để kiểm tra trong iterators còn dữ liệu hay ko

Lưu ý: 
- mỗi khi hàm generator được thực thi. mỗi thực thể instance iterator được tạo ra khác biệt nhau
- Cân lưu trữ vào biến để tái sử dụng

- yield và return có thể dùng trong generator function để trả về giá trị
- yield trả về iterator có giá trị done là false
- return trả về interator có giá trị done là true
- để thoát ra khỏi generator function nếu có lõi xảy ra ta dùng throw

Infinite loop
- với generator, sử dụng vòng lặp vô hạn vô cùng an toàn, vì hàm chỉ chạy với mỗi lời gọi hàm next, sau đó hàm sẽ tạm dừng để chờ vòng lặp chạy lại

generator trong generator
- yield* : dùng để nhường quyền lại cho một generator khác chạy

generator sinh ra để giải quyết luồng điều khiển không đồng bộ thành đồng bộ và code sẽ rõ ràng dễ đọc hơn (callback hell)

# root saga
- là entry point của saga. là nơi điều phối tất cả các sagas khác được sử dụng trong ứng dụng
- khởi động tất cả các sagas khác để chạy nền, theo dõi và kích hoạt xử lý các action
- có thể sử dụng đồng thời cả thunk và saga: vì mỗi saga sẽ lắng nghe, theo dõi, phản hồi các action cụ thể
- saga được gọi khi đăng ký theo dõi action

# fork
- watchFetchData: gọi là bộ theo dõi, người theo dõi action, là 1 generator function
- Dùng để rẽ nhánh, như if, else, switch, case để rẽ nhánh
- forrk thuộc redux-saga/effects
- cho phép rootSaga chuyển sang các bộ theo dõi khác
- mỗi fork là 1 non-blocking, có nghĩa là có thể kích hoạt nhiều bộ theo dõi cùng lúc (dispatch nhiều action cùng lúc)

# take
- dùng để phản hồi các action khi action được dispatch
- lệnh take sẽ được kích hoạt và tham gia vào saga khi một action được dispatch. Tạm dừng đến khi nhận action
- là blocking

# call
- tương tự như call của js
- thường được dùng để gửi request API, call API
- là blocking
- Giống như việc thực thi 1 function. Trả về promise và sẽ tạm dừng saga cho đến khi promise được resolved

# put
- dùng để dispatch action
- là non-blocking

# delay
- blocing
- để chặn thực thi trong 1 khoảng thời gian miliseconds (đầu vào của delay)

# takeLatest
- thay thế cho fork. là phiên bản của fork đã được bổ sung các chức năng nâng cao, mạnh mẽ
- hủy bỏ quy trình cũ khi có một quy trình mới bắt đầu
- nếu thực hiện một loạt các action, takeLatest chỉ thực thi và lấy kết quả của action cuối cùng
- Không cần vòng lặp vô hạn

# select
- lấy data từ store tại saga

# takeEvery
- Ngược với takeLatest, takeEvery sẽ chạy ngay lập tức nếu được kích hoạt, chạy không tính số lần, gọi là chạy, chạy không biết là action trước đó đã chạy xong chưa