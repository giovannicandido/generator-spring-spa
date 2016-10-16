package <%= packageName %>.config

import javax.sql.DataSource

import <%= packageName %>.config.FullPostgresqlDriver.api.Database
import org.springframework.context.annotation.{Bean, Configuration}

/**
  * Cria conexao com base de dados usando Slick
  * @author Giovanni Silva
  */
@Configuration
class SlickConfig {
  /**
    * Bean para ser injetado como DataSource
    * @param dataSource DataSource ativo no Spring. Conexão com base de dados
    * @return Base de dados Slick
    */
  @Bean
  def createDatabaseDef(dataSource: DataSource): Database = {
    Database.forDataSource(dataSource)
  }

}