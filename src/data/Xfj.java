package com.telephone.coursetable.XFJ;

import androidx.annotation.NonNull;

import com.telephone.coursetable.Database.Grades;
import com.telephone.coursetable.Database.GraduationScore;
import com.telephone.coursetable.Database.Methods.Methods;
import com.telephone.coursetable.Database.TermInfo;
import com.telephone.coursetable.Http.UrlProcess;
import com.telephone.coursetable.LogMe.LogMe;
import com.telephone.coursetable.MyApp;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Xfj {

    private static List<Map.Entry<String, Double>> get_in(List<Plan> plan_nodes, List<Score> score_nodes,
            List<String> term_id_list, boolean use_plan_term) {
        // // 遍历计划
        // for (Plan plan_node : plan_nodes) {//
        // 确定计划课程列表中每一门计划课程计入学分绩计算的学期，选修过一门计划课程相关的课，这门计划课程才计入学分绩计算，并且计入最早的选修记录所在的那个学期
        // ArrayList<Score> score_nodes_with_the_same_cid = new ArrayList<>();
        // for (Score score : score_nodes) {// 从成绩列表中选出课程代码相同的成绩
        // if (plan_node.getPlan_course_id().equals(score.getCourse_id())) {
        // score_nodes_with_the_same_cid.add(score);
        // }
        // }
        // String final_term;
        // if (score_nodes_with_the_same_cid.isEmpty()) {// 没有此计划课程代码的成绩记录
        // if (plan_node.getSterm() != null && !plan_node.getSterm().isEmpty()) {//
        // 如果有入选成绩，则取入选成绩的选修学期作为最终计入学分绩计算的学期
        // final_term = plan_node.getSterm();
        // } else {// 没有入选成绩，此计划课程不计入学分绩计算
        // final_term = null;
        // }
        // } else {// 存在此计划课程代码的成绩记录，取其中最早的成绩记录的选修学期作为最终计入学分绩计算的学期
        // Collections.sort(score_nodes_with_the_same_cid, (o1, o2) ->
        // o1.getTerm().compareTo(o2.getTerm()));
        // final_term = score_nodes_with_the_same_cid.get(0).getTerm();
        // }
        // plan_node.setFinal_term(final_term);
        // }

        // plan_nodes.removeIf(new Predicate<Plan>() {
        // @Override
        // public boolean test(Plan plan) {
        // return plan.getFinal_term() == null;// 移除不计入学分绩计算的计划课程
        // }
        // });

        // if (use_plan_term) {// 如果指定按计划应修学期来计算学分绩，则把计入学分绩计算的每一门计划课程的计入学期都设置为计划学期
        // for (Plan plan : plan_nodes) {
        // plan.setFinal_term(plan.getPlan_term());
        // }
        // }

        // 对于某些情况，例如入伍，可能会存在早于当前年级的选修学期/计划应修学期，因此应当生成一个新的学期列表，把这些不存在于参数传入的学期列表中的学期也添加到这个列表中
        // List<String> new_term_id_list = new LinkedList<>(term_id_list);
        // for (Plan plan : plan_nodes) {// 将所有plan中的要计算到那个学习学期拿出来
        // if (!new_term_id_list.contains(plan.getFinal_term())) {
        // new_term_id_list.add(plan.getFinal_term());
        // }
        // }

        // 基于补充后的学期列表生成一个学年列表，后续将基于这个学年列表构造用于构建返回值的 <学年, 计划课程列表> Map
        // List<String> year_list = new LinkedList<>();
        // for (String term_id : new_term_id_list) {
        // String year_code;
        // try {
        // year_code = term_id.substring(0, UrlProcess.isInternational() ? 4 : 9);
        // } catch (Exception e) {
        // LogMe.e("Xfj", "Exception caught. Roll back to 4");
        // year_code = term_id.substring(0, 4);
        // }
        // if (!year_list.contains(year_code)) {
        // year_list.add(year_code);
        // }
        // }

        // 构造用于构建返回值的 <学年, 计划课程列表> Map 的雏形，此时每一门计划课程尚未归入此 Map
        // Map<String, List<Plan>> year_plans_map = new HashMap<>();//将每个创建 key
        // :空List的数据结构
        // for (String year : year_list) {
        // year_plans_map.put(year, new LinkedList<>());
        // }

        // 将计入学分绩计算的每一门计划课程归入此
        // Map，注意：所有计入学分绩计算的计划课程归入完毕后，仍然可能会存在不包含任何计划课程的学年，那么这个学年最后的学分绩应当取默认值（例如 100 ）
        // for (Plan plan : plan_nodes) {
        // String year_code_of_plan;
        // try {
        // year_code_of_plan = plan.getFinal_term().substring(0,
        // UrlProcess.isInternational() ? 4 : 9);
        // } catch (Exception e) {
        // LogMe.e("Xfj", "Exception caught. Roll back to 4");
        // year_code_of_plan = plan.getFinal_term().substring(0, 4);
        // }
        // year_plans_map.get(year_code_of_plan).add(plan);
        // }

        // 构建返回值雏形：<学年, 学年学分绩> 列表
        List<Map.Entry<String, Double>> res = new LinkedList<>();

        // 将 Map 中的每一个学年，都计算出它相应的学年学分绩，然后添加到返回值列表中
        // 在计算每一个学年的学分绩的时候，如果这个学年包含计划课程，则顺便将这个学年的所有计划课程的总学分加到入学至今总学分中，方便后续计算入学至今学分绩
        double all_total_credit = 0;// 入学至今总学分
        for (String year_code : year_plans_map.keySet()) {
            // 取出此学年的计划课程列表
            List<Plan> plans_list_of_year = year_plans_map.get(year_code);
            if (plans_list_of_year.isEmpty()) {// 如果此学年不包含任何计划课程，则此学年学分绩直接设为 100
                res.add(Methods.entry(year_code, 100.0));
            } else {// 如果此学年包含计划课程，则计算此学年的学年学分绩
                double total_credit_hour = 0;// 学年总学分

                // 生成学年总学分
                for (Plan p : plans_list_of_year) {
                    total_credit_hour += p.getCredit_hour();
                }
                // 打印学年总学分
                LogMe.e("total_credit_hour", year_code + ": " + total_credit_hour);
                // 添加到入学至今总学分
                all_total_credit += total_credit_hour;

                // 填写每一门计划课程的计入学分绩计算的分数及其类型
                for (Plan p : plans_list_of_year) {
                    if (p.getSterm() != null && !p.getSterm().isEmpty()) {// 如果有入选成绩，照抄入选成绩
                        p.setFinal_score(p.getS_score());
                        p.setFinal_score_type(p.getS_score_type());
                    } else {// 没有入选成绩，取最好的成绩记录
                        List<Score> my_scores = score_nodes.stream()
                                .filter(score -> score.getCourse_id().equals(p.getPlan_course_id()))
                                .sorted(new Comparator<Score>() {
                                    @Override
                                    public int compare(Score o1, Score o2) {
                                        return (o1.getScore() - o2.getScore() >= 0) ? (-1) : (1); // 成绩高的排前面
                                    }
                                }).collect(Collectors.toList());
                        Score selected = my_scores.get(0);
                        p.setFinal_score(selected.getScore());
                        p.setFinal_score_type(selected.getScore_type());
                    }
                }

                // 生成每一门计划课程的学年加权绩点，并累加到初始值为0的学年学分绩上
                double year_grade_point = 0;// 学年学分绩
                for (Plan p : plans_list_of_year) {
                    year_grade_point += p.genGradePoint(total_credit_hour);// 成绩 * 学分 / 学年总学分
                }

                if (!(total_credit_hour > 0)) {// 此学年有课程但无学分，此学年学分绩直接设为 100
                    res.add(Methods.entry(year_code, 100.0));
                } else {
                    // 将此学年学分绩添加到返回值列表
                    res.add(Methods.entry(year_code, year_grade_point));
                }
            }
        }

        // 打印出 基于各学年总学分计算学分绩的 Map
        // String map_detail_base_year = MyApp.gson.toJson(year_plans_map);
        // map_detail_base_year = beauty(map_detail_base_year, "学年");
        // LogMe.e("XFJ-map-base-year", map_detail_base_year);

        double all_xfj = 100.0;// 入学至今学分绩
        if (all_total_credit > 0) {// 如果入学至今有任何计划课程计入学分绩计算，那么将入学至今学分绩设为0，重新生成每一门计划课程的入学至今加权绩点，并累加到入学至今学分绩上
            all_xfj = 0;
            for (Plan p : plan_nodes) {
                all_xfj += p.genGradePoint(all_total_credit);
            }
            // 打印入学至今总学分
            LogMe.e("total_credit_hour", "since_enrollment" + ": " + all_total_credit);
        }
        // 对返回值列表排序
        Collections.sort(res, new Comparator<Map.Entry<String, Double>>() {
            @Override
            public int compare(Map.Entry<String, Double> o1, Map.Entry<String, Double> o2) {
                return o1.getKey().compareTo(o2.getKey()) * -1; // 学年大的排前面（也就是时间晚的排前面）
            }
        });
        // 在返回值列表的首位添加入学至今学分绩
        res.add(0, Methods.entry("入学至今", all_xfj));
        // 打印出 基于入学至今总学分计算学分绩的 Map
        String map_detail_base_enrollment = MyApp.gson.toJson(year_plans_map);
        map_detail_base_enrollment = beauty(map_detail_base_enrollment, "入学至今");
        LogMe.e("XFJ-map-base-enrollment", map_detail_base_enrollment);
        // 打印出成绩单
        String scores_detail = MyApp.gson.toJson(score_nodes);
        LogMe.e("XFJ-scores_nodes", scores_detail);
        return res;
    }

    // 判断一系列是否要将课程列入学分绩的问题
    public static List<Map.Entry<String, Double>> get_must_on_background(boolean use_plan_term) {
        // 数据库加载课程计划 要B开头的
        List<GraduationScore> graduationScoreList = MyApp.getCurrentAppDB().graduationScoreDao().selectAll();
        graduationScoreList = graduationScoreList.stream().filter(new Predicate<GraduationScore>() {
            @Override
            public boolean test(GraduationScore graduationScore) {
                return graduationScore.courseid.toLowerCase().startsWith("b".toLowerCase());
            }
        }).collect(Collectors.toList());

        // 数据库加载成绩单要B开头和X开头的
        List<Grades> gradesList = MyApp.getCurrentAppDB().gradesDao().selectAll();
        gradesList = gradesList.stream().filter(new Predicate<Grades>() {
            @Override
            public boolean test(Grades grades) {
                return grades.courseid.toLowerCase().startsWith("b".toLowerCase())
                        || grades.courseid.toLowerCase().startsWith("x".toLowerCase());
            }
        }).collect(Collectors.toList());

        List<TermInfo> termInfoList = MyApp.getCurrentAppDB().termInfoDao().selectAll();
        String graduation_detail = MyApp.gson.toJson(graduationScoreList);
        String grades_detail = MyApp.gson.toJson(gradesList);

        // 课程计划 判断是否为实验课程
        List<Plan> plans = new LinkedList<>();
        for (GraduationScore g : graduationScoreList) {
            plans.add(new Plan(
                    g.courseid, g.cname, g.term, g.credithour, getNullFromEmptyString(g.sterm), g.score,
                    (g.courseid.toLowerCase().startsWith("bs".toLowerCase())) ? (1) : (0) // 实践环节为五级制，其余正常
            ));
        }

        // 限选
        Map<String, List<Grades>> xz_map = new HashMap<>();// <限选课程代码, 此限选课的所有成绩记录列表>

        // 成绩单
        List<Score> scores = new LinkedList<>();
        for (Grades grade : gradesList) {
            scores.add(new Score(
                    grade.courseid, grade.courseno, grade.term, grade.score,
                    grade.cjlx));

            if (grade.courseid.toLowerCase().startsWith("xz".toLowerCase())) {// 如果为限选课程 将限选课程统计出来
                if (xz_map.containsKey(grade.courseid)) {
                    xz_map.get(grade.courseid).add(grade);
                } else {
                    xz_map.put(grade.courseid, new LinkedList<Grades>() {
                        {
                            add(grade);
                        }
                    });
                }
            }
        }
        for (String xz_course_id : xz_map.keySet()) {// 对于每一门限选课
            List<Grades> xz_grade_list = xz_map.get(xz_course_id);// 这门限选课的所有成绩记录

            // 有无过了的？
            boolean pass = false;
            for (Grades g : xz_grade_list) {
                if (g.score >= 60) {
                    pass = true;
                    break;
                }
            }

            if (pass) {// 如果这门限选课过了，那么将它添加到毕业计划课程 因为从数据库读取时 只是读取了B开头的
                // 取这门限选课所有成绩记录中最早的选修学期
                Collections.sort(xz_grade_list, new Comparator<Grades>() {
                    @Override
                    public int compare(Grades o1, Grades o2) {
                        return o1.term.compareTo(o2.term);// 时间早的排前面
                    }
                });
                String term = xz_grade_list.get(0).term;
                // 取这门限选课所有成绩记录中最好的分数和相应的选修学期
                Collections.sort(xz_grade_list, new Comparator<Grades>() {
                    @Override
                    public int compare(Grades o1, Grades o2) {
                        return (o1.score - o2.score >= 0) ? (-1) : (1);// 分数高的排前面
                    }
                });
                double best_score = xz_grade_list.get(0).score;
                String best_score_term = xz_grade_list.get(0).term;
                plans.add(new Plan(
                        xz_course_id, // 这门限选课的课程代码
                        xz_grade_list.get(0).cname, // 随便取一个课程名称
                        term, // 取最早的选修学期作为计划应修学期
                        xz_grade_list.get(0).xf, // 随便取一个学分
                        best_score_term, // 取最好分数的选修学期作为入选成绩的选修学期
                        best_score, // 取最好分数作为入选成绩
                        xz_grade_list.get(0).cjlx // 随便取一个成绩类型
                ));
            }
        }

        List<String> term_ids = new LinkedList<>();
        for (TermInfo t : termInfoList) {
            term_ids.add(t.term);
        }

        return get_in(plans, scores, term_ids, use_plan_term);
    }

    private static String getNullFromEmptyString(String s) {
        if (s == null) {
            return s;
        } else {
            return s.isEmpty() ? null : s;
        }
    }

    private static String beauty(@NonNull String s, @NonNull String type) {
        s = s.replace("credit_hour", "学分");
        s = s.replace("final_level_score", "计算学分绩的分数");
        s = s.replace("final_score_type", "成绩类型");
        s = s.replace("final_score", "成绩");
        s = s.replace("final_term", "计入哪个学期的学分绩计算");
        s = s.replace("final_weighted_grade_point", type + "加权学分");
        s = s.replace("plan_course_id", "课程代码");
        s = s.replace("plan_course_name", "课程名称");
        s = s.replace("plan_term", "计划应修学期");
        s = s.replace("s_score_type", "选修成绩类型");
        s = s.replace("s_score", "选修成绩");
        s = s.replace("sterm", "选修学期");
        return s;
    }
}
