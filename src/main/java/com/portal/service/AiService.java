package com.portal.service;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    public String generateJobDescription(String designation, String department) {
        return "Job Title: " + designation + "\n" +
               "Department: " + department + "\n\n" +
               "Role Summary:\n" +
               "We are looking for a skilled " + designation +
               " to join our " + department + " team.\n\n" +
               "Key Responsibilities:\n" +
               "• Design and develop scalable solutions\n" +
               "• Collaborate with cross-functional teams\n" +
               "• Participate in code reviews\n" +
               "• Maintain documentation and best practices\n" +
               "• Contribute to continuous improvement\n\n" +
               "Required Skills:\n" +
               "• Strong problem-solving abilities\n" +
               "• Excellent communication skills\n" +
               "• Experience with relevant tools\n\n" +
               "Qualifications:\n" +
               "• Bachelor's degree in relevant field\n" +
               "• 2+ years of experience in similar role";
    }
}