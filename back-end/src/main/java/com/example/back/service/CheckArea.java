package com.example.back.service;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CheckArea {
    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {
        return inRectangle(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }

    private static boolean inRectangle(BigDecimal x, BigDecimal y, BigDecimal r) {
       return x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && x.compareTo(r) <= 0 && y.abs().compareTo(r) <= 0;
    }

    private static boolean inTriangle(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal x1 = BigDecimal.ZERO;
        BigDecimal y1 = BigDecimal.ZERO;
        BigDecimal x2 = r.negate().divide(BigDecimal.valueOf(2));
        BigDecimal y2 = BigDecimal.ZERO;
        BigDecimal x3 = BigDecimal.ZERO;
        BigDecimal y3 = r;

        BigDecimal fullTriangleArea = x1.multiply(y2.subtract(y3)).add(x2.multiply(y3.subtract(y1))).add(x3.multiply(y1.subtract(y2))).divide(BigDecimal.valueOf(2)).abs();
        BigDecimal subTriangle1Area = x.multiply(y1.subtract(y2)).add(x1.multiply(y2.subtract(y))).add(x2.multiply(y.subtract(y1))).divide(BigDecimal.valueOf(2)).abs();
        BigDecimal subTriangle2Area = x.multiply(y2.subtract(y3)).add(x2.multiply(y3.subtract(y))).add(x3.multiply(y.subtract(y2))).divide(BigDecimal.valueOf(2)).abs();
        BigDecimal subTriangle3Area = x.multiply(y3.subtract(y1)).add(x3.multiply(y1.subtract(y))).add(x1.multiply(y.subtract(y3))).divide(BigDecimal.valueOf(2)).abs();

        return x.compareTo(BigDecimal.ZERO)<=0 && y.compareTo(BigDecimal.ZERO)>=0 && (fullTriangleArea.compareTo( subTriangle1Area.add( subTriangle2Area).add( subTriangle3Area)) == 0);
    }

    private static boolean inCircle(BigDecimal x, BigDecimal y, BigDecimal r) {
        return x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && x.pow(2).add(y.pow(2)).compareTo(r.divide(new BigDecimal(2)).pow(2)) <= 0;
    }

    public boolean validate(BigDecimal x , BigDecimal y , BigDecimal r){
            if ( (x.compareTo(new BigDecimal(-5)) >= 0) && (x.compareTo(new BigDecimal(5)) <= 0) && (y.compareTo(new BigDecimal(-5)) >= 0) && (y.compareTo(new BigDecimal(5)) <= 0) && (r.compareTo(new BigDecimal(1)) >= 0) && (r.compareTo(new BigDecimal(5)) <= 0)) {
                return true;
            }
        return false;
    }
}
