package com.douzone.mehago.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.douzone.mehago.repository")
public class ElasticsearchClientConfig extends AbstractElasticsearchConfiguration{

    @Override
    public RestHighLevelClient elasticsearchClient() {
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                                                                            .connectedTo("127.0.0.1:9200")
                                                                            .build();


        return RestClients.create(clientConfiguration).rest();
    }
    
}
