package com.molina.crudspring.service;

import com.molina.crudspring.dto.CourseDTO;
import com.molina.crudspring.dto.mapper.CourseMapper;
import com.molina.crudspring.exception.RecordNotFoundException;
import com.molina.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public  List<CourseDTO> list(){
        return courseRepository.findAll()
                .stream()
                .map(courseMapper::toDTO)
//                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
                .collect(Collectors.toList());
    }

    public CourseDTO findById(@NotNull @Positive Long id){
        return courseRepository.findById(id).map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create( @Valid @NotNull  CourseDTO course) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(@Valid @NotNull @Positive Long id, @Valid CourseDTO course ){
        return courseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(course.name());
                    recordFound.setCategory(this.courseMapper.convertCategoryValue(course.category()));
                    return courseMapper.toDTO(courseRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() ->
                new RecordNotFoundException(id)));
    }
}
