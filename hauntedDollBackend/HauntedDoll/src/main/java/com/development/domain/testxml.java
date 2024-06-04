package com.development.domain;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "test") 
public class testxml implements Serializable {  
   private static final long serialVersionUID = 1L; 
   private String name; 

   public testxml(){} 

   public testxml(String name){  
      this.name = name; 
   }  
   
   public String getName() { 
      return name; 
   } 
   @XmlElement 
   public void setName(String name) { 
      this.name = name; 
   }
}