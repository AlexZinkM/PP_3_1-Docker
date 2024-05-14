package ru.kata.spring.boot_security.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.util.UserErrorResponse;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/users")
@CrossOrigin
public class RestController {

    UserService userService;

    @Autowired
    public RestController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping()
    public List<User> showAll() {
        return userService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> findByID(@PathVariable("id") Long id) {
        User user = userService.findByIdRest(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<HttpStatus> postUser(@RequestBody User user) {
        User userInDB = userService.findByEmail(user.getEmail());
        if (userInDB != null) {
            if (userInDB.getPassword().equals(user.getPassword())) {
                userService.putUser(user);
                return ResponseEntity.ok(HttpStatus.OK);
            }
        }
        userService.saveUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }



    @PostMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }


//    @ExceptionHandler
//    private ResponseEntity<UserErrorResponse> excHandler(UserNotFoundException e) {
//        UserErrorResponse response = new UserErrorResponse(
//                "User with this id wasn't found",
//                System.currentTimeMillis()
//        );
//        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//    }
}