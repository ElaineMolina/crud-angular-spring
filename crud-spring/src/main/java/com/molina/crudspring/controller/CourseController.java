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
    public @ResponseBody List<Course> list(){
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id){
        return courseRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
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
