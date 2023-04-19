package com.molina.crudspring.controller;

import com.molina.crudspring.modal.Course;
import com.molina.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {
    private final CourseRepository courseRepository;

//    public CourseController(CourseRepository courseRepository) {
//        this.courseRepository = courseRepository;
//    }

    @GetMapping
    public List<Course> list(){
        return courseRepository.findAll();
    }
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course) {
//        System.out.println(course.getName());
        return courseRepository.save(course);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(courseRepository.save(course));
    }
}