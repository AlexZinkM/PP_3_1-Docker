package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {
    User findById(Long id);

    User findByIdRest(Long id);

    List<User> findAll();


    void saveUser(User user);


    void putUser(User user);

    void deleteById(Long id);

   User findByEmail(String string);
}
