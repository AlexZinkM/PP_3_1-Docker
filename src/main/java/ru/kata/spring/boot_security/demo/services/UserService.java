package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserService {
    User findById(Long id);

    List<User> findAll();


    void saveUser(User user);


    void deleteById(Long id);

   User findByEmail(String string);
}
