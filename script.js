
// ==========================================
// STUDENT ATTENDANCE REPORT SYSTEM
// JavaScript Version
// ==========================================


// Get HTML Elements
const nameInput = document.getElementById("studentName");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const totalDaysInput = document.getElementById("totalDays");
const attendedInput = document.getElementById("attended");
const absentInput = document.getElementById("absent");

const autoCalculate = document.getElementById("autoCalculate");

const statusBadge = document.getElementById("statusBadge");
const statusDescription = document.getElementById("statusDescription");
const progressBar = document.getElementById("progressBar");

const attendanceValue = document.getElementById("attendanceValue");
const absentValue = document.getElementById("absentValue");
const standingValue = document.getElementById("standingValue");

const reportArea = document.getElementById("reportArea");
const copyButton = document.getElementById("copyButton");


// ==========================================
// AUTO-CALCULATE ABSENT DAYS
// ==========================================

function autoCalculateAbsent() {

    if (!autoCalculate.checked) {
        return;
    }

    const total = totalDaysInput.value;
    const attended = attendedInput.value;

    if (total !== "" && attended !== "") {

        const totalDays = Number(total);
        const daysAttended = Number(attended);

        if (Number.isInteger(totalDays) &&
            Number.isInteger(daysAttended) &&
            totalDays >= 0 &&
            daysAttended >= 0 &&
            daysAttended <= totalDays) {

            absentInput.value = totalDays - daysAttended;

        } else {
            absentInput.value = "";
        }
    } else {
        absentInput.value = "";
    }
}


// Listen for input changes
totalDaysInput.addEventListener("input", autoCalculateAbsent);
attendedInput.addEventListener("input", autoCalculateAbsent);


// ==========================================
// CALCULATE ATTENDANCE
// ==========================================

function calculateAttendance(days, totalDays) {

    return (days / totalDays) * 100;

}


// ==========================================
// DETERMINE STUDENT STATUS
// ==========================================

function determineStatus(attendance) {

    if (attendance >= 75) {
        return "Present";
    } else {
        return "Needs Improvement";
    }

}


// ==========================================
// GENERATE ATTENDANCE REPORT
// ==========================================

function generateReport() {

    // Get input values
    const name = nameInput.value.trim();
    const course = courseInput.value.trim();
    const year = yearInput.value.trim();

    const totalDays = totalDaysInput.value;
    const attended = attendedInput.value;
    const absent = absentInput.value;


    // Validate empty fields
    if (name === "") {
        alert("Please enter the student's name.");
        nameInput.focus();
        return;
    }

    if (course === "") {
        alert("Please enter the student's course.");
        courseInput.focus();
        return;
    }

    if (year === "") {
        alert("Please enter year.");
        yearInput.focus();
        return;
    }

    


    if (totalDays === "" || attended === "" || absent === "") {
        alert("Please fill in all attendance fields.");
        return;
    }


    // Convert inputs into numbers
    const total = Number(totalDays);
    const daysAttended = Number(attended);
    const daysAbsent = Number(absent);


    // Validate integers
    if (
        !Number.isInteger(total) ||
        !Number.isInteger(daysAttended) ||
        !Number.isInteger(daysAbsent)
    ) {
        alert("Please enter valid whole numbers.");
        return;
    }


    // Validate total school days
    if (total <= 0) {
        alert("Total School Days must be greater than 0.");
        totalDaysInput.focus();
        return;
    }


    // Validate attended days
    if (daysAttended < 0) {
        alert("Days Attended cannot be negative.");
        attendedInput.focus();
        return;
    }


    // Validate absent days
    if (daysAbsent < 0) {
        alert("Days Absent cannot be negative.");
        absentInput.focus();
        return;
    }


    // Validate attendance information
    if (daysAttended + daysAbsent !== total) {

        alert(
            "Invalid attendance information.\n\n" +
            "Attended (" + daysAttended + ") + Absent (" +
            daysAbsent + ") = " +
            (daysAttended + daysAbsent) +
            "\n\nThis does not equal Total Days (" + total + ")."
        );

        return;
    }


    // ======================================
    // CALCULATIONS
    // ======================================

    const attendance = calculateAttendance(
        daysAttended,
        total
    );

    const absentPercentage = calculateAttendance(
        daysAbsent,
        total
    );

    const status = determineStatus(attendance);


    // ======================================
    // UPDATE ANALYTICS
    // ======================================

    updateAnalytics(
        attendance,
        absentPercentage,
        status
    );


    // ======================================
    // BUILD REPORT
    // ======================================

    const report = buildReport(
        name,
        course,
        year,
        total,
        daysAttended,
        daysAbsent,
        attendance,
        absentPercentage,
        status
    );

    reportArea.value = report;

    copyButton.disabled = false;

}


// ==========================================
// UPDATE ATTENDANCE ANALYTICS
// ==========================================

function updateAnalytics(attendance, absentPercentage, status) {

    const formattedAttendance = attendance.toFixed(2);
    const formattedAbsent = absentPercentage.toFixed(2);

    // Update progress bar
    progressBar.style.width = attendance + "%";
    progressBar.textContent = formattedAttendance + "%";

    if (status === "Present") {

        statusBadge.textContent = "STATUS: PRESENT";

        statusBadge.style.background = "#dcfce7";
        statusBadge.style.color = "#16a34a";

        progressBar.style.background = "#16a34a";

        statusDescription.textContent =
            "Good standing (Attendance ≥ 75%).";

    } else {

        statusBadge.textContent = "STATUS: NEEDS IMPROVEMENT";

        statusBadge.style.background = "#fee2e2";
        statusBadge.style.color = "#dc2626";

        progressBar.style.background = "#dc2626";

        statusDescription.textContent =
            "Warning: Attendance below 75% threshold.";

    }


    // Update percentage values
    attendanceValue.textContent =
        "Attendance: " + formattedAttendance + "%";

    absentValue.textContent =
        "Absent: " + formattedAbsent + "%";

    standingValue.textContent =
        "Standing: " + status;

}


// ==========================================
// BUILD OFFICIAL ATTENDANCE REPORT
// ==========================================

function buildReport(
    name,
    course,
    year,
    totalDays,
    attended,
    absent,
    attendance,
    absentPercentage,
    status
) {

    let report = "";

    report += "==================================================\n";
    report += "               ATTENDANCE REPORT                  \n";
    report += "==================================================\n";

    report += "Student Name        : " + name + "\n";
    report += "Course        : " + course + "\n";
    report += "Year        : " + year + "\n";
    report += "Total School Days   : " + totalDays + "\n";
    report += "Days Attended       : " + attended + "\n";
    report += "Days Absent         : " + absent + "\n";

    report += "--------------------------------------------------\n";

    report += "Attendance          : " + attendance.toFixed(2) + "%\n";

    report += "Absent Percentage   : " + absentPercentage.toFixed(2) + "%\n";

    report += "Status              : " + status + "\n";

    report += "--------------------------------------------------\n";

    if (status === "Present") {

        report +=
            "Remarks: The student meets the minimum attendance\n" +
            "         requirement (75% or higher).\n";

    } else {

        report +=
            "Remarks: Attendance is below the required 75%.\n" +
            "         Intervention or notification advised.\n";

    }

    report += "==================================================\n";

    return report;

}


// ==========================================
// LOAD SAMPLE DATA
// ==========================================

function loadSampleData() {

    nameInput.value = "Gracia May J. Alpez";

    totalDaysInput.value = 100;
    attendedInput.value = 85;
    absentInput.value = 15;

    autoCalculate.checked = true;

    generateReport();

}


// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    nameInput.value = "";
    courseInput.value = "";
    yearInput.value = "";

    totalDaysInput.value = "";
    attendedInput.value = "";
    absentInput.value = "";

    autoCalculate.checked = true;

    // Reset status
    statusBadge.textContent = "AWAITING INPUT";

    statusBadge.style.background = "#e2e8f0";
    statusBadge.style.color = "#64748b";

    statusDescription.textContent =
        "Fill in the fields to calculate attendance.";

    // Reset progress bar
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";
    progressBar.style.background = "#2563eb";

    // Reset analytics
    attendanceValue.textContent = "Attendance: --%";
    absentValue.textContent = "Absent: --%";
    standingValue.textContent = "Standing: --";

    // Reset report
    reportArea.value =
        "No report generated yet.\n" +
        "Enter student details and click Generate Report.";

    copyButton.disabled = true;

    nameInput.focus();

}


// ==========================================
// COPY REPORT TO CLIPBOARD
// ==========================================

async function copyReport() {

    const report = reportArea.value;

    if (report.trim() !== "") {

        try {

            await navigator.clipboard.writeText(report);

            alert("Report copied to clipboard!");

        } catch (error) {

            // Fallback for browsers without clipboard permission
            reportArea.focus();
            reportArea.select();

            const copied = document.execCommand("copy");

            if (copied) {
                alert("Report copied to clipboard!");
            } else {
                alert("Unable to copy report. Please copy it manually.");
            }

        }

    }

}


// ==========================================
// END OF PROGRAM
// ==========================================
