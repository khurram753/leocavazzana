<!-- Left Sidebar -->
<div class="left main-sidebar">

    <div class="sidebar-inner leftscroll">

        <div id="sidebar-menu">

            <ul>

                <li class="submenu">
                    <a

                        @if(Request()->route()->getName() == 'userDashboard')
                        class="active"
                        @endif
                        href="{{route('userDashboard')}}">
                        <i class="fas fa-tachometer-alt"></i> <span> Dashboard</span>
                        {{--<span class="menu-arrow"></span>--}}
                    </a>
                </li>


                <li class="submenu">
                    <a

                        @if(Request()->route()->getName() == 'requestPage')
                        class="active"
                        @endif
                        href="{{route('requestPage')}}">
                        <i class="fas fa-tachometer-alt"></i> <span> Request</span>
                        {{--<span class="menu-arrow"></span>--}}
                    </a>
                </li>

                <li class="submenu">
                    <a

                        @if(Request()->route()->getName() == 'fileSection')
                        class="active"
                        @endif
                        href="{{route('fileSection')}}">
                        <i class="fas fa-tachometer-alt"></i> <span> File Section</span>
                        {{--<span class="menu-arrow"></span>--}}
                    </a>
                </li>






            </ul>


            <div class="clearfix"></div>

        </div>

        <div class="clearfix"></div>

    </div>

</div>
<!-- End Sidebar -->
