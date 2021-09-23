package com.douzone.mehago.repository;

import java.util.List;

import com.douzone.mehago.vo.FileUpload;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FileUploadRepository {
    private final SqlSession sqlSession;

    public boolean addFile(FileUpload file) {
        return sqlSession.insert("fileupload.addFile", file) == 1 ? true : false;
    }

    public List<FileUpload> getFileList(Long chatRoomNo) {
        return sqlSession.selectList("fileupload.getFileList", chatRoomNo);
    }

}
