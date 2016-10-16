package <%= packageName %>
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.beans.factory.annotation.Autowired
import <%= packageName %>.test.annotations.IntegTest
import <%= packageName %>.test.IntegrationTest
import <%= packageName %>.config.FullPostgresqlDriver.api._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent._
import scala.concurrent.duration._


@RunWith(classOf[SpringJUnit4ClassRunner])
@IntegTest
class DBLoadsTest extends IntegrationTest {
    @Autowired
    val db: Database = null

    @Test
    def loadDB(): Unit = {
       val query = sql"select 1".as[String]
       val result = Await.result(db.run(query), 10 seconds)
       println(result)
       assert(result(0) === "1")
    }
}