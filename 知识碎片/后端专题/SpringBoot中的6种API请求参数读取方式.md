# SpringBoot中的6种API请求参数读取方式

使用Spring Boot开发API的时候，读取请求参数是服务端编码中最基本的一项操作，Spring Boot中也提供了多种机制来满足不同的API设计要求。

## **@RequestParam**

这是最常用的一个，用来加载URL中`?`之后的参数。

比如：这个请求`/user?name=didispace` 就可以如下面这样，使用`@RequestParam`来加载URL中的name参数

```java
@GetMapping("/user")
@ResponseBody()
public User findUserByName(@RequestParam("name") String name){ 
    return userRepo.findByName(name);
}
```

## **@PathVariable**

这是RESTful风格API中常用的注解，用来加载URL路径中的参数

比如：这个请求`/user/1` 就可以如下面这样，使用`@PathVariable`来加载URL中的id参数

```java
@GetMapping("/user/{id}")
@ResponseBody()
public User findUserById(@PathVariable("id") String id){ 
    return userRepo.findById(id);
}
```

## **@MatrixVariable**

这个我们用的并不是很多，但一些国外系统有提供这类API参数，这种API的参数通过`;`分割。

比如：这个请求`/books/reviews;isbn=1234;topN=5;` 就可以如下面这样，使用`@MatrixVariable`来加载URL中用`;`分割的参数

```java
@GetMapping("/books/reviews")
@ResponseBody()
public List<BookReview> getBookReviews( 
  @MatrixVariable String isbn,  @MatrixVariable Integer topN) {
  return bookReviewsLogic.getTopNReviewsByIsbn(isbn, topN);
}
```

## **@RequestBody**

这也是最常用的一个注解，用来加载POST/PUT请求的复杂请求体（也叫：payload）。比如，客户端需要提交一个复杂数据的时候，就要将这些数据放到请求体中，然后服务端用`@RequestBody`来加载请求体中的数据

```java
@PostMapping("/add")
public boolean addAccounts(@RequestBody List<Account> accounts) throws SQLException {
     accounts.stream().forEach(a -> {
         a.setCreatedOn(Timestamp.from(Instant.now()));
         a.setLastLogin(Timestamp.from(Instant.now()));
     });
     return notificationLogic.addAccounts(accounts);
}
```

## **@RequestHeader**

`@RequestHeader`注解用来加载请求头中的数据，一般在业务系统中不太使用，但在基础设施的建设中会比较常用，比如传递分布式系统的TraceID等。用法也很简单，比如，假设我们将鉴权数据存在http请求头中，那么就可以像下面这样用`@RequestHeader`来加载请求头中的`Authorization`参数

```java
@GetMapping("/user")
@ResponseBody()
public List<User> getUserList(@RequestHeader("Authorization") String authToken) {
     return userRepo.findAll();
}
```

## **@CookieValue**

当我们需要与客户端保持有状态的交互时，就需要用到Cookie。此时，服务端读取Cookie数据的时候，就可以像下面这样用`@CookieValue`来读取Cookie中的`SessionId`数据

```java
@GetMapping("/user")
@ResponseBody()
public List<User> getUserList(@CookieValue(name = "SessionId") String sessionId) {
     return userRepo.findAll();
}
```
