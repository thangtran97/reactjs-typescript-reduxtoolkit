package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Video {

    private int id;
    private String label;
    private String url;
    private String type;
}
