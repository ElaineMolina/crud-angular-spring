package com.molina.crudspring.dto.mapper;


import com.molina.crudspring.dto.CourseDTO;
import com.molina.crudspring.enums.Category;
import com.molina.crudspring.modal.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course){
        if (course == null) {
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(), course.getCategory().getValue());
    }

    public Course toEntity(CourseDTO courseDTO){
        if (courseDTO == null) {
            return null;
        }
        Course course = new Course();
        if(courseDTO.id() != null){
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));
        return course;
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONT_END;
            case "Back-end" -> Category.BACK_END;
            case "DevOps" -> Category.DEVOPS;
            case "Microsserviços" -> Category.MICROSSERVIÇOS;
            default -> throw new IllegalArgumentException("Invalid Category." + value);
        };
    }
}
