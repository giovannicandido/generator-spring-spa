package <%= packageName %>
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import <%= packageName %>.test.annotations.IntegTest
import <%= packageName %>.test.IntegrationTest

/**
  * @author Giovanni Silva
  */
@RunWith(classOf[SpringJUnit4ClassRunner])
@IntegTest
class ContextLoadTest extends IntegrationTest {
  @Test def context() {
  }
}
