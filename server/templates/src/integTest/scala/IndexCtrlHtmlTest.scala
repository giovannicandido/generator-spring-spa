package <%= packageName %>
import <%= packageName %>.test.IntegrationTest
import org.assertj.core.api.Assertions._
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context._
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

/**
 * Test if the app runs with index.html
 * Check docs on http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html
 */
@RunWith(classOf[SpringJUnit4ClassRunner])
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
class IndexCtrlAngularTest extends IntegrationTest {
    @Autowired
    val restTemplate: TestRestTemplate = null

    @Test
    def indexHtml(){
      val response = this.restTemplate
            .getForEntity("/", classOf[String])  

    <% if (clientTech == 'angular') { %>
    assertThat(response.getBody())
        .contains("<app-root>")
    <% } %>
    <% if (clientTech == 'aurelia') { %>
    assertThat(response.getBody())
        .contains("aurelia-app")
    <% } %>

    }
}
