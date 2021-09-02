package com.douzone.mehago.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
    
    private static final String SAVE_PATH = "/uploads-mehago";
    private static final String URL_BASE = "/images";

    public String restore(MultipartFile file) {
        String url = null;
        try{
            if(file.isEmpty()){
                return url;
            }

            String originFilename = file.getOriginalFilename();
            String extName =  originFilename.substring(originFilename.lastIndexOf('.') + 1);
			String saveFilename = generateSaveFilename(extName);
			long fileSize = file.getSize();
			
			System.out.println("########################" + originFilename);
			System.out.println("########################" + fileSize);
			System.out.println("########################" + saveFilename);
			
			byte[] data = file.getBytes();
            // 경로 지정
            

			OutputStream os = new FileOutputStream(SAVE_PATH +"/"+saveFilename);
			os.write(data);
			os.close();
			
			url = URL_BASE +"/"+ saveFilename;
        } catch (IOException e) {
			throw new RuntimeException();
		}
		return url;
    }

    private String generateSaveFilename(String extName) {
		String filename = "";
		Calendar calendar = Calendar.getInstance();
		filename += calendar.get(Calendar.YEAR);
		filename += calendar.get(Calendar.MONTH);
		filename += calendar.get(Calendar.DATE);
		filename += calendar.get(Calendar.HOUR);
		filename += calendar.get(Calendar.MINUTE);
		filename += calendar.get(Calendar.SECOND);
		filename += calendar.get(Calendar.MILLISECOND);
		filename += ("." + extName);
		
		return filename;
	}

}
