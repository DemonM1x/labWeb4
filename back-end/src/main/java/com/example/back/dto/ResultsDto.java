package com.example.back.dto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ResultsDto {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;

}
