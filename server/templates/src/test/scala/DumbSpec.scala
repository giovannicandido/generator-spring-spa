package <%= packageName %>
import <%= packageName %>.test.AppSpec

class DumbSpec extends AppSpec {
  "DumbSpec" should "pass" in {
    1 must equal(1)
  }
}