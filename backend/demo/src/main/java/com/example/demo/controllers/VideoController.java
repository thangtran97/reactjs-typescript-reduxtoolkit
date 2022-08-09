package com.example.demo.controllers;

import com.example.demo.entity.Video;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin
@RequestMapping("/videos")
public class VideoController {

    private static List<Video> videoList = Stream.of(
        new Video(0, "HLS", "https://wowza.peer5.com/live/smil:bbb_abr.smil/playlist.m3u8", "application/x-mpegURL"),
        new Video(1, "DASH", "https://livesim.dashif.org/livesim/mup_30/testpic_2s/Manifest.mpd", "application/dash+xml")
    ).collect(Collectors.toList());

    @GetMapping
    public Map<String, Object> getAll() throws InterruptedException {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("total", videoList.size());
        response.put("data", videoList);
        
        return response;
    }

    @GetMapping("/{id}")
    public Map<String, Object> getDetail(@PathVariable("id") int id) throws InterruptedException {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", videoList.get(id));
        
        return response;
    }

    @PostMapping
    public Map<String, Object> add(@RequestBody Video video) throws InterruptedException {
        Map<String, Object> response = new LinkedHashMap<>();
        Map<String, Object> errors = new LinkedHashMap<>();
        response.put("success", true);
        if ("url".equals(video.getUrl())) {
            response.put("success", false);
            errors.put("url", "URL is invalid!");
        }
        if ("mp4".equals(video.getType())) {
            response.put("success", false);
            errors.put("type", "Type is invalid!");
        }
        response.put("errors", errors);
        if (Boolean.TRUE.equals(response.get("success"))) {
            video.setId(videoList.size());
            videoList.add(video);
        }
        
        return response;
    }

    @PutMapping("/{id}")
    public Map<String, Object> edit(@PathVariable("id") int id, @RequestBody Video video) throws InterruptedException {
        Map<String, Object> response = new LinkedHashMap<>();
        Map<String, Object> errors = new LinkedHashMap<>();
        response.put("success", true);
        if ("url".equals(video.getUrl())) {
            response.put("success", false);
            errors.put("url", "URL is invalid!");
        }
        if ("mp4".equals(video.getType())) {
            response.put("success", false);
            errors.put("type", "Type is invalid!");
        }
        response.put("errors", errors);
        if (Boolean.TRUE.equals(response.get("success"))) {
            videoList.set(id, video);
        }
        
        return response;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable("id") int id) throws InterruptedException {
        videoList.remove(id);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        
        return response;
    }

}
