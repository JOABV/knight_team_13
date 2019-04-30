package com.knight.app.Controller;

import com.knight.app.Repository.PolicyRepository;
import com.knight.app.Repository.UserRepository;
import com.knight.app.entities.Policy;
import com.knight.app.entities.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping(path="/staff/lost_luggage")
public class StaffClaimController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PolicyRepository policyRepository;

	@PostMapping(path="/receive")
	public @ResponseBody JSONObject lost_luggage_receive (@RequestBody String policy_number) {
		JSONObject jso = new JSONObject();
		if (policyRepository.exists(policy_number)){
			Policy p = policyRepository.findOne(policy_number);
			jso.put("Checkcode", 100);
			jso.put("Message", p);
		}else{
			jso.put("Checkcode", 201);
			jso.put("Message", "It doesn't exist");
		}
		return jso;
	}

	@PostMapping(path="/receive")
	public @ResponseBody JSONObject lost_luggage_message (@RequestBody JSONObject jso) {
		JSONObject back = new JSONObject();
		if(jso.has("policy_number") && jso.has("status")){
			//TODO

			back.put("Checkcode", 100);
			back.put("Message", "success");
		}else{
			back.put("Checkcode", 200);
			back.put("Message", "Wrong type");
		}
		return back;
	}

	@GetMapping(path="/list")
	public @ResponseBody JSONObject getClaimList(@RequestBody JSONObject jso) {

		//TODO
		return null;
	}

	@PostMapping(path="/feedback_submit")
	public @ResponseBody JSONObject lost_luggage_submit (@RequestBody JSONObject jso) {
		JSONObject back = new JSONObject();
		if(jso.has("policy_number") && jso.has("status") && jso.has("message")){
			//TODO

			back.put("Checkcode", 100);
			back.put("Message", "success");
		}else{
			back.put("Checkcode", 200);
			back.put("Message", "Wrong type");
		}
		return back;
	}

}
