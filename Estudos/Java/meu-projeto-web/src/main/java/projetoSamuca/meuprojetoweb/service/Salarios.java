package projetoSamuca.meuprojetoweb.request;

import jakarta.ws.rs.core.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
public class Salarios {

    private BigDecimal meuSalarioDeProgramador = new BigDecimal("10.00");

    @ResponseBody
    @RequestMapping(method= RequestMethod.GET,
    path = "salario-programador", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getSalarioProgramador() {

        return new ResponseEntity<>(meuSalarioDeProgramador, HttpStatus.OK);
    }

}
