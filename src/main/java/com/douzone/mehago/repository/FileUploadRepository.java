package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.FileUpload;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FileUploadRepository {
    private final SqlSession sqlSession;

    public Long addFile(FileUpload file) {
        sqlSession.insert("fileupload.addFile", file);
        return file.getNo();
    }

    public List<FileUpload> getFileList(Long chatRoomNo, Long accountNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("accountNo", accountNo);
        return sqlSession.selectList("fileupload.getFileList", map);
    }

}
