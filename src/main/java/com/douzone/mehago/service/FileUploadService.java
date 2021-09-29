package com.douzone.mehago.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;

import com.douzone.mehago.repository.FileUploadRepository;
import com.douzone.mehago.vo.FileUpload;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadService {

	private final FileUploadRepository fileUploadRepository;

	private static final String ACCOUNT_SAVE_PATH = "/uploads-mehago/account";
	private static final String CATHROOM_SAVE_PATH = "/uploads-mehago/chatroom";
	private static final String ACCOUNT_URL_BASE = "/images/account";
	private static final String CATHROOM_URL_BASE = "/images/chatroom";

	public String restore(String imageCategory, MultipartFile file) {
		String url = null;
		try {
			if (file.isEmpty()) {
				return url;
			}

			String originFilename = file.getOriginalFilename();
			String extName = originFilename.substring(originFilename.lastIndexOf('.') + 1);
			String saveFilename = generateSaveFilename(extName);
			long fileSize = file.getSize();

			System.out.println("########################" + originFilename);
			System.out.println("########################" + fileSize);
			System.out.println("########################" + saveFilename);

			byte[] data = file.getBytes();
			// 경로 지정

			OutputStream os = null;
			if (imageCategory == "account") {
				os = new FileOutputStream(ACCOUNT_SAVE_PATH + "/" + saveFilename);
			} else if (imageCategory == "chatroom") {
				os = new FileOutputStream(CATHROOM_SAVE_PATH + "/" + saveFilename);
			}

			os.write(data);
			os.close();

			if (imageCategory == "account") {
				url = ACCOUNT_URL_BASE + "/" + saveFilename;
			} else if (imageCategory == "chatroom") {
				url = CATHROOM_URL_BASE + "/" + saveFilename;
			}

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

	public Long addFile(FileUpload file) {
		return fileUploadRepository.addFile(file);
	}

	public List<FileUpload> getFileList(Long chatRoomNo) {
		return fileUploadRepository.getFileList(chatRoomNo);
	}

}
