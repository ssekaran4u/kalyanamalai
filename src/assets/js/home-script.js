$(document).ready(function() {
    $("#dob").datepicker({
        autoclose: true,
        todayHighlight: true,
        endDate: "today",
    }).on('changeDate', function(e) {
        $('.dobClass').addClass('active');
    });

    $("#DivorceDate").datepicker({
        autoclose: true,
        todayHighlight: true,
        endDate: "today",
    }).on('changeDate', function(e) {
        $('.DivorceDateClass').addClass('active');
    });
    $('.form-control').on('focus blur change', function(e) {
        var $currEl = $(this);
        if ($currEl.is('select')) {
            if ($currEl.val() === $("option:first", $currEl).val()) {
                $('.control-label', $currEl.parent()).animate({ opacity: 0 }, 240);
                $currEl.parent().removeClass('focused');
            } else {
                $('.control-label', $currEl.parent()).css({ opacity: 1 });
                $currEl.parents('.form-group').toggleClass('focused', ((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
            }
        } else {
            $currEl.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }
    }).trigger('blur');


    $('input').on('focusin', function() {
        $(this).parent().find('label').addClass('active');
    });

    $('input').on('focusout', function() {
        if (!this.value) {
            $(this).parent().find('label').removeClass('active');
        }
    });

    $('._Ms_s').on('click', function() {
        $('.MaritalStatus li').removeClass('active');
        $(this).addClass('active');
        var value = $(this).data("item");
        if (value == 21) {
            // Divorced
            $('#DivorceCopy').show();
            $('#DivorcedData').show();
            $('#HaveChildrenList').show();
        } else if (value == 22) {
            // Widow / Widower
            $('#DivorcedData').show();
            $('#DivorceCopy').hide();
            $('#HaveChildrenList').show();
            $('#HaveChildrenData').hide();
            $('#ChildrenStayData').hide();

        } else if (value == 23) {
            // Marriage not Consumated
            $('#DivorceCopy').show();
            $('#DivorcedData').show();
            $('#HaveChildrenData').hide();
            $('#HaveChildrenList').hide();
        } else {
            $('#DivorceCopy').hide();
            $('#DivorcedData').hide();
            $('#HaveChildrenData').hide();
            $('#ChildrenStayData').hide();
            $('#HaveChildrenList').hide();
        }
        // console.log();
    });

    // $('#MaritalStatus').change(function() 
    // {       
    //     $('input[name="HaveChildren"]').removeAttr("checked");
    //     $('input[name="ChildrenStay"]').removeAttr("checked");

    // });

    $('._Ms_hc').on('click', function() {
        $('.HaveChildrenS li').removeClass('active');
        $(this).addClass('active');
        var value = $(this).data("item");
        if (value == 1) {
            $('#HaveChildrenData').show();
        } else {
            $('#HaveChildrenData').hide();
        }
    });

    // ChildrenStay
    $('._Ms_cs').on('click', function() {
        $('.ChildrenStay li').removeClass('active');
        $(this).addClass('active');
        var value = $(this).data("item");
        if (value == 1) {
            $('#ChildrenStayData').show();
        } else {
            $('#ChildrenStayData').hide();
        }
    });

    // Dosham
    $('._Ms_ds').on('click', function() {
        $('.Dosham_List li').removeClass('active');
        $(this).addClass('active');
        var value = $(this).data("item");
        if (value == 2) {
            $('#DoshamList').show();
        } else {
            $('#DoshamList').hide();
            $('.Dosham_ListData li').removeClass('active');
        }
    });
    // Family Value
    $('._Ms_fv').on('click', function() {
        $('.Family_ValueList li').removeClass('active');
        $(this).addClass('active');
    });

    // Family Status
    $('._Ms_fst').on('click', function() {
        $('.Family_StatusList li').removeClass('active');
        $(this).addClass('active');
    });

    // Diet List
    $('._Ms_ydi').on('click', function() {
        $('.Your_DietList li').removeClass('active');
        $(this).addClass('active');
    });

    // Complexion List
    $('._Ms_cmlt').on('click', function() {
        $('.ComplexionList li').removeClass('active');
        $(this).addClass('active');
    });

    // Physique List
    $('._Ms_physique').on('click', function() {
        $('.PhysiqueList li').removeClass('active');
        $(this).addClass('active');
    });

    // Physical disability
    $('._Ms_phsi').on('click', function() {
        var value = $(this).data("item");
        if (value == 1) {
            $('#Physical_disability').show();
        } else {
            $('#Physical_disability').hide();
            $('.Physical_disabilityList li').removeClass('active');
            $('#PhysicaldisabilityData').hide();
            $('#PhysicaldisabilityOther').val('');
            $('.PhysicaldisabilityOther').removeClass('active');
        }
        $('.Physical_disabilityList li').removeClass('active');
        $(this).addClass('active');

    });

    // Physical disability 
    $('._Ms_phsiys').on('click', function() {
        if ($(this).hasClass('active') == true) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }

        if ($(this).data("item") == 4 && $(this).hasClass('active') == true) {
            $('#PhysicaldisabilityData').show();
        }
        if ($(this).data("item") == 4 && $(this).hasClass('active') == false) {
            $('#PhysicaldisabilityData').hide();
        }
    });

    // Smoking Habits
    $('._Ms_smhb').on('click', function() {
        $('.Smoking_Habits li').removeClass('active');
        $(this).addClass('active');
    });

    // Drinking Habits
    $('._Ms_drhb').on('click', function() {
        $('.Drinking_Habits li').removeClass('active');
        $(this).addClass('active');
    });

    // Dosam Check
    $(document).on('click', '._Ms_dld', function() {
        if ($(this).hasClass('active') == true) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    // Income Type
    $('._Ms_inty').on('click', function() {
        $('.Income_TypeList li').removeClass('active');
        $(this).addClass('active');
    });

    // Ask Additional Income
    $('._Ms_asaddin').on('click', function() {
        if ($(this).data("item") == 1) {
            $('#AdditionalIncome').show();
        } else {
            $('#AdditionalIncome').hide();
        }

        $('.AskAdditional_Income li').removeClass('active');
        $(this).addClass('active');
    });

    // Working Address ask
    $('._Ms_aswrkadd').on('click', function() {
        if ($(this).data("item") == 2) {
            $('#AskWorkingAdd').show();
        } else {
            $('#AskWorkingAdd').hide();
        }

        $('.AskWorkingAdd li').removeClass('active');
        $(this).addClass('active');
    });
    // Working Permanent ask
    $('._Ms_asperadd').on('click', function() {
        if ($(this).data("item") == 2) {
            $('#AskPermanentAdd').show();
        } else {
            $('#AskPermanentAdd').hide();
        }

        $('.AskPermanentAdd li').removeClass('active');
        $(this).addClass('active');
    });
    // Describe yourself in a few words
    $('.YourselfContent').on('click', function() {
        if ($(this).hasClass('present') == true) {
            $(this).removeClass('present');
            $('#YourselfContent').hide();
        } else {
            $(this).addClass('present');
            $('#YourselfContent').show();
        }
    });

    //  Choose yourself content
    $('input[name="Describeyourself"]:radio').change(function() {
        $('.YourselfContent').removeClass('present');
        $('#YourselfContent').hide();
        $('#Describeyourself').val($('.Describeyourself' + this.value).html());
    });


    // My Expectation about life partner
    $('.MyExpectationContent').on('click', function() {
        if ($(this).hasClass('present') == true) {
            $(this).removeClass('present');
            $('#MyExpectationContent').hide();
        } else {
            $(this).addClass('present');
            $('#MyExpectationContent').show();
        }
    });

    //  Choose My Expectation content
    $('input[name="MyExpectation"]:radio').change(function() {
        $('.MyExpectationContent').removeClass('present');
        $('#MyExpectationContent').hide();
        $('#MyExpectationText').val($('.MyExpectation' + this.value).html());
    });





    // $('input[name="MyExpectation"]:radio').change(function() {
    //     $('#MyExpectationText').val($('.MyExpectation' + this.value).html());
    // });


    $('input[name="aIncome"]:radio').change(function() {
        if (this.value == 1) {
            $('#aIncomeData').show();
        } else {
            $('#aIncomeData').hide();
        }
    });

    $('input[name="physicalDis"]:radio').change(function() {
        if (this.value == 1) {
            $('#physicalDisList').show();
        } else {
            $('#physicalDisList').hide();
        }
    });

    $('.physicalDisList').click(function() {
        if ($(this).is(":checked") == true && $(this).val() == 4) {
            if ($(this).prop("checked") == true) {
                $('#physicalDisListOther').show();
            }

        }
        if ($(this).is(":checked") == false && $(this).val() == 4) {
            if ($(this).prop("checked") == false) {
                $('#physicalDisListOther').hide();
            }
        }

    });


    // physicalDisList
    // $('.datepicker').datepicker({
    //     defaultDate: new Date(),
    //     format: 'dd/mm/yyyy',
    //     endDate: '+0d',
    //     autoclose: true
    // });

});