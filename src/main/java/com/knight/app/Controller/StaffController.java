package com.knight.app.Controller;

import com.knight.app.entities.Policy;
import com.knight.app.entities.Staff;
import com.knight.app.Repository.PolicyRepository;
import com.knight.app.Repository.StaffRepository;
import com.knight.app.mapper.StaffMapper;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller    // This means that this class is a Controller
@CrossOrigin
@RequestMapping(path="/staff") // This means URL's start with /demo (after Application path)
public class StaffController {
	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private StaffMapper staffMapper;

	@Autowired
	private PolicyRepository policyRepository;

	@PostMapping(path="/login")
	public @ResponseBody JSONObject login (@RequestBody Staff staff) {

		JSONObject jso = new JSONObject();
        Staff staff1 = staffRepository.findOne(staff.getPhone());

		if (staff1 == null){
            if (! staffRepository.exists(staff.getPhone())){
                jso.put("Checkcode", 200);
				jso.put("Message", "not exit");
            }else{
				jso.put("Checkcode", 201);
				jso.put("Message", "wrong password");
            }
		}else{
			jso.put("Checkcode", 100);
			jso.put("Message", "success");
		}
		return jso;
	}
}
