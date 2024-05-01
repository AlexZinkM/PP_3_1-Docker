package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;

@RequestMapping("/admin")
@org.springframework.stereotype.Controller
class AdminController {

    private final UserService userService;
    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/admin")
    public String getAll(Model model, Principal principal) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("thisUser", userService.findByEmail(principal.getName()));
        return "admin";
    }



    @GetMapping("/get")
    public String get(@RequestParam(value = "id") Long id, Model model) {
        User user = userService.findById(id);
        if (user == null) {
            return "errorPage";
        }
        model.addAttribute("user", user);
        return "get";
    }


    @GetMapping("/createGet")
    public String newUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("thisUser", userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));
        return "newUser";
    }


    @PostMapping("/createPost")
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "userSaved";
    }



    @GetMapping("/delete/{id}")
    public String delete(@PathVariable(value = "id") Long id) {
        if (userService.findById(id) == null) {
            return "errorPage";
        }
        userService.deleteById(id);
        return "deleteCompleted";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "changeCompleted";
    }


//    @GetMapping("/completed")
//    public String showChangeCompletedPage() {
//        return "changeCompleted";
//    }



}

